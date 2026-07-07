import calendar
import re
from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request
from models.database import db, Usuario, Categoria, Produto, Relatorios  # Ajusta o import para o teu projeto

Dashboard_API = Blueprint("Dashboard_API", __name__)

def limpar_para_float(valor):
    """Auxiliar para limpar textos como 'AOA 10.200' ou strings vazias e converter para float de forma segura"""
    if valor is None:
        return 0.0
    if isinstance(valor, (int, float)):
        return float(valor)
    try:
        # Remove caracteres que não sejam dígitos, pontos ou vírgulas
        valor_limpo = re.sub(r'[^\d,.-]', '', str(valor)).strip()
        if ',' in valor_limpo and '.' in valor_limpo:
            valor_limpo = valor_limpo.replace('.', '').replace(',', '.')
        elif ',' in valor_limpo:
            valor_limpo = valor_limpo.replace(',', '.')
        return float(valor_limpo)
    except Exception:
        return 0.0

@Dashboard_API.route("/dashboard_dados/<int:id_empresario>", methods=["GET"])
def obter_dados_dashboard(id_empresario):
    try:
        hoje = datetime.utcnow().date()
        ano_atual = datetime.utcnow().year

        # 1. CONSULTAS DIRETAS À BASE DE DADOS
        todas_vendas = Relatorios.query.filter(Relatorios.id_empresario == id_empresario).all()
        
        # CARD 3: Itens com Stock Baixo (Menor que 5 unidades conforme o teu print)
        itens_stock_baixo = Produto.query.filter(
            Produto.id_empresario == id_empresario, 
            Produto.quantidade_stock_registro < 5
        ).count()

        # CARD 4: Total de Produtos Cadastrados pelo empresário
        total_produtos_cadastrados = Produto.query.filter(Produto.id_empresario == id_empresario).count()

        # ==========================================================
        # PROCESSAMENTO DOS CARDS 1 & 2 (VENDAS HOJE E LUCRO TOTAL)
        # ==========================================================
        vendas_hoje_valor = 0.0
        vendas_hoje_contador = 0
        lucro_total_acumulado = 0.0

        for venda in todas_vendas:
            # Como total_pago_produto_venda e lucro_produto_venda estão mapeados de forma flexível, garantimos float/int
            total_venda = limpar_para_float(venda.total_pago_produto_venda)
            lucro_venda = limpar_para_float(venda.lucro_produto_venda)

            # Acumula o lucro de todo o período do empresário
            lucro_total_acumulado += lucro_venda

            # Compara se a data do registro da venda bate com o dia de hoje
            # Se for datetime, extrai apenas o .date() para comparar corretamente
            data_venda = venda.data_venda_produto.date() if hasattr(venda.data_venda_produto, 'date') else venda.data_venda_produto
            if data_venda == hoje:
                vendas_hoje_valor += total_venda
                vendas_hoje_contador += 1

        # ==========================================================
        # GRÁFICO 1: VENDAS DIÁRIAS DOS ÚLTIMOS 7 DIAS (DOMINGO A SÁBADO)
        # ==========================================================
        dias_semana_nome = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
        vendas_por_dia_semana = {nome: 0.0 for nome in dias_semana_nome}
        
        # Encontra o Domingo da semana atual para abrir a janela dos 7 dias úteis
        dia_atual_semana = (datetime.utcnow().weekday() + 1) % 7
        inicio_da_semana = hoje - timedelta(days=dia_atual_semana)

        for venda in todas_vendas:
            data_venda = venda.data_venda_produto.date() if hasattr(venda.data_venda_produto, 'date') else venda.data_venda_produto
            if data_venda >= inicio_da_semana:
                # weekday() do Python: 0=Segunda, ..., 6=Domingo. Ajustamos para 0=Domingo, ..., 6=Sábado
                w_day = (venda.data_venda_produto.weekday() + 1) % 7
                nome_dia = dias_semana_nome[w_day]
                vendas_por_dia_semana[nome_dia] += limpar_para_float(venda.total_pago_produto_venda)

        grafico_vendas_diarias = [
            {"dia": dia, "vendas": valor} for dia, valor in vendas_por_dia_semana.items()
        ]

        # ==========================================================
        # GRÁFICO 2: VENDAS MENSAIS (ÚLTIMOS 6 MESES OU ANO INTEIRO)
        # ==========================================================
        meses_ano_nome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        vendas_por_mes = {nome: 0.0 for nome in meses_ano_nome}

        for venda in todas_vendas:
            # Agrupa dinamicamente os faturamentos dentro do ano corrente
            if venda.data_venda_produto.year == ano_atual:
                num_mes = venda.data_venda_produto.month - 1
                nome_mes = meses_ano_nome[num_mes]
                vendas_por_mes[nome_mes] += limpar_para_float(venda.total_pago_produto_venda)

        grafico_vendas_mensais = [
            {"mes": mes, "vendas": valor} for mes, valor in vendas_por_mes.items()
        ]

        # ==========================================================
        # GRÁFICO 3: LUCRO POR CATEGORIA (BARRA AZUL + LINHA TENDÊNCIA)
        # ==========================================================
        lucro_por_categoria_map = {}

        for venda in todas_vendas:
            # Usa o campo categoria_produto_venda que está na tabela Relatorios
            cat_nome = venda.categoria_produto_venda if venda.categoria_produto_venda else "Sem Categoria"
            lucro_venda = limpar_para_float(venda.lucro_produto_venda)

            if cat_nome not in lucro_por_categoria_map:
                lucro_por_categoria_map[cat_nome] = 0.0
            lucro_por_categoria_map[cat_nome] += lucro_venda

        grafico_lucro_categoria = []
        lucro_acumulado_tracker = 0.0

        for cat, lucro_valor in lucro_por_categoria_map.items():
            lucro_acumulado_tracker += lucro_valor
            grafico_lucro_categoria.append({
                "categoria": cat,
                "lucro_kz": lucro_valor,
                "lucro_acumulado": lucro_acumulado_tracker  # Alimenta a linha de curva preta do gráfico
            })

        # ==========================================================
        # RETORNO DO JSON FORMATADO EM ALTA PERFORMANCE
        # ==========================================================
        dados_dashboard = {
            "cards": {
                "vendas_hoje_valor": vendas_hoje_valor,
                "vendas_hoje_quantidade": vendas_hoje_contador,
                "lucro_total_acumulado": lucro_total_acumulado,
                "itens_stock_baixo": itens_stock_baixo,
                "total_produtos_cadastrados": total_produtos_cadastrados
            },
            "grafico_vendas_diarias": grafico_vendas_diarias,
            "grafico_vendas_mensais": grafico_vendas_mensais,
            "grafico_lucro_categoria": grafico_lucro_categoria
        }

        return jsonify(dados_dashboard), 200

    except Exception as erro:
        print(f"Erro interno no motor da Dashboard API: {erro}")
        return jsonify({"resposta": "Erro ao compilar e processar os dados do painel gerencial"}), 500
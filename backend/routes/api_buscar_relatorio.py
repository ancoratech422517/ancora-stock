import calendar
from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request
from models.database import Relatorios

Buscar_Relatorio = Blueprint("Buscar_Relatorio", __name__)


@Buscar_Relatorio.route("/buscar_relatorio/<int:id_empresario>", methods=["GET"])
def buscar_relatorio(id_empresario):
    try:
        # 1. Captura os parâmetros de consulta da URL (Query Parameters)
        periodo = request.args.get("periodo", "todos")
        mes_especifico = request.args.get("mes", type=int)
        ano_especifico = request.args.get("ano", type=int)

        hoje = datetime.utcnow()

        # Começamos a query filtrando apenas pelo empresário logado
        query = Relatorios.query.filter(Relatorios.id_empresario == id_empresario)

        # 2. Aplica a lógica de filtragem por data no Banco de Dados
        
        # Caso A: Usuário escolheu um mês e ano específicos do passado
        if mes_especifico and ano_especifico:
            inicio_periodo = datetime(ano_especifico, mes_especifico, 1, 0, 0, 0)
            # Encontra o último dia correto daquele mês (ex: 28, 30 ou 31)
            ultimo_dia = calendar.monthrange(ano_especifico, mes_especifico)[1]
            fim_periodo = datetime(
                ano_especifico, mes_especifico, ultimo_dia, 23, 59, 59
            )

            query = query.filter(
                Relatorios.data_venda_produto >= inicio_periodo,
                Relatorios.data_venda_produto <= fim_periodo,
            )

        # Caso B: Filtros rápidos baseados no momento atual
        elif periodo == "hoje":
            inicio_dia = hoje.replace(hour=0, minute=0, second=0, microsecond=0)
            query = query.filter(Relatorios.data_venda_produto >= inicio_dia)

        elif periodo == "semana":
            # Encontra a segunda-feira da semana atual
            inicio_semana = hoje - timedelta(days=hoje.weekday())
            inicio_semana = inicio_semana.replace(
                hour=0, minute=0, second=0, microsecond=0
            )
            query = query.filter(Relatorios.data_venda_produto >= inicio_semana)

        elif periodo == "mes":
            # Primeiro dia do mês atual
            inicio_mes = hoje.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            query = query.filter(Relatorios.data_venda_produto >= inicio_mes)

        elif periodo == "ano":
            # Primeiro dia do ano atual
            inicio_ano = hoje.replace(
                month=1, day=1, hour=0, minute=0, second=0, microsecond=0
            )
            query = query.filter(Relatorios.data_venda_produto >= inicio_ano)

        # Se for 'todos' (e não houver mês/ano específicos), ele ignora os blocos acima e traz tudo

        # 3. Executa a busca ordenando pelas vendas mais recentes
        relatorio_das_vendas = query.order_by(
            Relatorios.data_venda_produto.desc()
        ).all()

        if not relatorio_das_vendas:
            return jsonify([])

        # 4. Estrutura o retorno JSON
        lista_relatorio = []
        for lista in relatorio_das_vendas:
            item = {
                "id_empresario": lista.id_empresario,
                "id_produto_venda": lista.id_produto_venda,
                "nome_produto_venda": lista.nome_produto_venda,
                "quanidade_produto_venda": lista.quanidade_produto_venda,
                "total_pago_produto_venda": lista.total_pago_produto_venda,
                "lucro_produto_venda": lista.lucro_produto_venda,
                "categoria_produto_venda": lista.categoria_produto_venda,
                "data_venda_produto": lista.data_venda_produto,
            }
            lista_relatorio.append(item)

        return jsonify(lista_relatorio)

    except Exception as erro:
        print(f"Erro ao buscar os dados do relatorio das vendas: {erro}")
        return (
            jsonify({"resposta": "erro ao buscar os dados do relatorio"}),
            500,
        )  # Adicionado status 500 para boas práticas de erro
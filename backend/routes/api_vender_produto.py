from flask import Blueprint, request, jsonify
from models.database import Relatorios, db, Produto
Vender_Produto = Blueprint("Vender_Produto", __name__)

@Vender_Produto.route("/vender_produto", methods=["POST"])
def vender_produto():
    try:
        data = request.get_json()
        nome_produto = data.get("nome_produto")
        quantidade_produto = data.get("quantidade_produto")
        
        # --- CORREÇÃO AQUI ---
        # Recebe o valor (ex: "AOA 1600.00")
        total_pago_raw = data.get("total_pago") 
        
        # Se for uma string contendo texto, limpa removendo "AOA", espaços e converte para float
        if isinstance(total_pago_raw, str):
            total_pago = float(total_pago_raw.replace("AOA", "").strip())
        else:
            total_pago = float(total_pago_raw)
        # ---------------------

        id_produto = data.get("id_produto")
        id_empresario = data.get("id_empresario")
        categoria_produto = data.get("categoria_produto")
        preco_custo = data.get("preco_custo")
        preco_venda_produto = data.get("preco_venda_produto")

        lucro = (int(preco_venda_produto) - int(preco_custo)) * int(quantidade_produto)
        print(f"este é o custo do produto:{preco_custo}")
        print(f"e este é a quantiadde solicitada pelo cliente:{quantidade_produto}")

        dados = {
            "nome_produto_venda": nome_produto,
            "quanidade_produto_venda": quantidade_produto,
            "total_pago_produto_venda": total_pago,  # Agora vai o número puro (ex: 1600.0)
            "lucro_produto_venda": lucro,
            "categoria_produto_venda": categoria_produto,
            "id_produto_venda": id_produto,
            "id_empresario": id_empresario
        }
        
        diminuir_quantidade_produto = Produto.query.filter(
            Produto.id == id_produto,
            Produto.id_empresario == id_empresario
        ).first()
        
        if diminuir_quantidade_produto:
            novo_valor = int(diminuir_quantidade_produto.quantidade_stock_registro) - int(quantidade_produto)
            diminuir_quantidade_produto.quantidade_stock_registro = novo_valor

            nova_venda = Relatorios(**dados)
            db.session.add(nova_venda)
            db.session.commit()
            
        return jsonify({"resposta": "boas , produto vendido com sucesso!", "status": "true"})
    
    except Exception as erro:
        print(f"erro ao registrar a venda do produto:{erro}")
        return jsonify({"resposta": "erro ao realizar a venda do produto", "status": "false"})
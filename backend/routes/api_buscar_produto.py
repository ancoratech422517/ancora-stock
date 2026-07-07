from flask import Blueprint , jsonify
from models.database import Produto
Buscar_Produto = Blueprint("Buscar_Produto" , __name__)

@Buscar_Produto.route("/buscar_produto/<int:id_empresario>" , methods = ["GET"])
def buscar_produto(id_empresario):
    try:
        produto = Produto.query.filter(
            Produto.id_empresario == id_empresario
        ).all()
        if not produto:
            return jsonify([])
        
        lista_produto = []
        for x in produto:
            item = {
                "id":x.id,
                "nome_produto_registro":x.nome_produto_registro,
                "categoria_produto_registro":x.categoria_produto_registro,
                "preco_custo_registro":x.preco_custo_registro,
                "preco_venda_registro":x.preco_venda_registro,
                "quantidade_stock_registro":x.quantidade_stock_registro,
                "url_imagem_produto":x.url_imagem_produto,
                "id_empresario":x.id_empresario         
            }
            lista_produto.append(item)
        
        return jsonify(lista_produto)
    except Exception as erro:
        print(f"erro ao registrar o produto:{erro}")
        return jsonify({"resposta":"erro ao registrar o produto" , "status":"false"})

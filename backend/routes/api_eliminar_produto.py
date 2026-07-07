from flask import Blueprint , request , jsonify
from models.database import Produto , db

Eliminar_Produto = Blueprint("Eliminar_Produto" , __name__)

@Eliminar_Produto.route("/eliminar_produto" , methods = ["POST"])
def eliminar_produto():
    try:
        dados = request.get_json()
        id_empresario = dados.get("id_empresario")
        id_produto = dados.get("id_produto")

        produto = Produto.query.filter(
            Produto.id_empresario == id_empresario,
            Produto.id == id_produto
        )

        if produto:
            produto.delete()
            db.session.commit()
        return jsonify({"resposta":"produto eliminado com sucesso" , "status":"true"})
    
    except Exception as erro:
        print(f"erro ao eliminar o produto:{erro}")
        return jsonify({"erro":"erro ao eliminar o peoduto , entre en contacto com o programador Cláudio Avelino! 946212157" , "status":"false"})
    

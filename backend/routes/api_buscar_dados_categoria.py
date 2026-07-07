from flask import Blueprint , request , jsonify
from models.database import Categoria
Buscar_Dados_Categoria = Blueprint("Buscar_Dados_Categoria" , __name__)

@Buscar_Dados_Categoria.route("/buscar_dados_categoria/<int:id_empresario>" , methods = ["GET"])
def buscar_dados_categoria(id_empresario):
    try:
        buscar_categoria_empresario = Categoria.query.filter(
            Categoria.id_empresario == str(id_empresario)
        ).all()
        if not buscar_categoria_empresario:
            return jsonify([])
        
        lista_categoria = []
        for x in buscar_categoria_empresario:
            item = {
                "nome_categoria":x.nome_categoria,
                "id_empresario":x.id_empresario
            }
            lista_categoria.append(item)
            print(item)
        
        return jsonify(lista_categoria)
    except Exception as erro:
        print(f"erro ao buscar os dados da categoria:{erro}")
        return jsonify([])
    


    
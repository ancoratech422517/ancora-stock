from flask import Blueprint , request , jsonify
from models.database import Categoria , db
Registrar_Categoria = Blueprint("Registrar_Categoria" , __name__)

@Registrar_Categoria.route("/registrar_categoria" , methods = ["post"])
def registrar_categoria():
    try:
        dados = request.get_json()
        nome_categoria = dados.get("nome_categoria")
        id_empresario = dados.get("id_empresario")

        if nome_categoria == "":
            return jsonify({"resposta":"o campo de nome não pode estar vazio ou nulo" , "estado":"false"})

        dados_categoria = {
            "nome_categoria":nome_categoria,
            "id_empresario":id_empresario
        }

        nova_categoria = Categoria(**dados_categoria)
        db.session.add(nova_categoria)
        db.session.commit()
        return jsonify({"resposta":"Boas , categoria adicionada com sucesso!" , "estado":"true"})
    except Exception as erro:
        print(f"erro ao registarr uma nova categoria:{erro}")
        return jsonify({"resposta":f"erro ao registrar uma nova categoria:{erro}" , "estado":"false"})
    


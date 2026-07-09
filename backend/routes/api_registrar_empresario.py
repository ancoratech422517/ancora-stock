from flask import Blueprint , jsonify , request , json
from models.database import Usuario , db


registrar_empresario = Blueprint("registrar_empresario" , __name__)
@registrar_empresario.route("/registrar_empresario" , methods = ["POST"])
def Registrar_Epresario():
    try:
        dados = request.get_json()
        nome_registro = dados.get("nome_registro")
        numero_registro = dados.get("numero_registro")
        senha_registro = dados.get("senha_registro")
        confirmar_senha_registro = dados.get("confirmar_senha_registro")

        dados_registro = {
            "nome_registro":nome_registro,
            "numero_registro":numero_registro,
            "senha_registro":senha_registro
        }

        if senha_registro != confirmar_senha_registro:
            return jsonify({"resposta":"as senha não coicidem"})
        
        novo_registro = Usuario(**dados_registro)
        db.session.add(novo_registro)
        db.session.commit()
        return jsonify({"resposta":"usuario registrado com sucesso" , "status":"true"})
    except Exception as erro:
        print(f"erro ao registrar o empresario:{erro}")
        return jsonify({"resposta":"erro ao registrar o empresario" , "status":"false"})
        

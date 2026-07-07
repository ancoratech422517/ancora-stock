from flask import Blueprint , request , json , jsonify
from models.database import Usuario , db

Login = Blueprint("login" , __name__)

@Login.route("/login" , methods = ["POST"])
def logar():
    try:
        dados = request.get_json()
        numero_login = dados.get("numero_login")
        senha_login = dados.get("senha_login")

        usuario = Usuario.query.filter(
            Usuario.numero_registro == numero_login,
            Usuario.senha_registro == senha_login
        ).first()
        if usuario:
            dados = {
                "id":usuario.id,
                "nome_registro":usuario.nome_registro,
                "numero_registro":usuario.numero_registro
            }
            return jsonify({"resposta":"true" , "dados":dados})
        else:
            return jsonify({"resposta":"false"})
        
    except Exception as erro:
        print(f"erro ao logar:{erro}")
        return jsonify({"resposta":f"erro ao logar:{erro}"})
    
    
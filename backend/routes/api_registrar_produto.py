import os
from flask import Blueprint, request, jsonify
from models.database import Produto, db
import cloudinary
import cloudinary.uploader  # Importa o módulo de upload

Registrar_Produto = Blueprint("Registrar_Produto", __name__)

# Configuração do Cloudinary (ele pega as variáveis do ambiente automaticamente se carregar o dotenv no app.py)
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

@Registrar_Produto.route("/registrar_produto/<int:id_empresario>", methods=["post"])
def registrar_produto(id_empresario):
    try:
        nome_registro_produto = request.form.get("nome_registro_produto")
        categoria_produto_registro = request.form.get("categoria_produto_registro")
        preco_custo_registro = request.form.get("preco_custo_registro")
        preco_venda_produto = request.form.get("preco_venda_produto")
        quantidade_stock_registro = request.form.get("quantidade_stock_registro")
        imagem_produto_registro = request.files.get("imagem_produto_registro")
        
        url_imagem = None

        # Verifica se o usuário enviou uma imagem
        if imagem_produto_registro:
            # Faz o upload direto para o Cloudinary sem salvar nada localmente
            upload_result = cloudinary.uploader.upload(
                imagem_produto_registro,
                folder="produtos_gestao_stock"  # Cria uma pasta organizada dentro do seu Cloudinary
            )
            # Pega a URL segura (https) gerada pelo Cloudinary
            url_imagem = upload_result.get("secure_url")

        dados = {
            "nome_produto_registro": nome_registro_produto,
            "categoria_produto_registro": categoria_produto_registro,
            "preco_custo_registro": preco_custo_registro,
            "preco_venda_registro": preco_venda_produto,
            "quantidade_stock_registro": quantidade_stock_registro,
            "url_imagem_produto": url_imagem,  # Agora salvamos a URL da nuvem no Postgres
            "id_empresario": id_empresario
        }
        
        novo_produto = Produto(**dados)
        db.session.add(novo_produto)
        db.session.commit()
        
        return jsonify({"resposta": "Boas , produto registrado com sucesso", "status": "true"})
        
    except Exception as erro:
        print(f"erro ao registrar o produto:{erro}")
        return jsonify({"resposta": "erro ao registrar o produto", "status": "false"})
import os
from flask import Blueprint, request, jsonify
from models.database import Produto, db
import cloudinary
import cloudinary.uploader  # Importa o módulo de upload do Cloudinary

Editar_Produto = Blueprint("Editar_Produto", __name__)

# Configuração do Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

@Editar_Produto.route("/editar_produto", methods=["POST"])
def editar_produto():
    try:
        condicao = False
        url_image = None
        
        nome_registro_produto = request.form.get("nome_registro_produto")
        categoria_produto_registro = request.form.get("categoria_produto_registro")
        preco_custo_registro = request.form.get("preco_custo_registro")
        preco_venda_produto = request.form.get("preco_venda_produto")
        quantidade_stock_registro = request.form.get("quantidade_stock_registro")
        id_empresario = request.form.get("id_empresario")
        id_produto = request.form.get("id_produto")
        nova_imagem_produto = request.files.get("imagem_produto_registro")
        
        # Verifica se o usuário enviou uma nova imagem para atualizar
        if not nova_imagem_produto:
            condicao = False 
            print("Não tem imagem nova para atualizar, mantendo a atual.")
        else:
            print("Nova imagem recebida, iniciando upload para o Cloudinary...")
            try:
                # Faz o upload direto para o Cloudinary na mesma pasta organizada
                upload_result = cloudinary.uploader.upload(
                    nova_imagem_produto,
                    folder="produtos_gestao_stock"
                )
                # Pega a URL segura (https) gerada
                url_image = upload_result.get("secure_url")
                condicao = True
            except Exception as erro:
                print(f"erro ao salvar a nova imagem no Cloudinary: {erro}")
                condicao = False

        # Busca o produto no banco de dados do Neon
        produto = Produto.query.filter(
            Produto.id == id_produto,
            Produto.id_empresario == id_empresario
        ).all()
        
        if not produto:
            return jsonify({"resposta": "estranho , vc não tem nehum produto , como é que clicastes no botão de editar? Gatuno."})
        
        # Atualiza os dados do produto
        for meus_produto in produto:
            meus_produto.nome_produto_registro = nome_registro_produto
            meus_produto.categoria_produto_registro = categoria_produto_registro
            meus_produto.preco_custo_registro = preco_custo_registro
            meus_produto.preco_venda_registro = preco_venda_produto
            meus_produto.quantidade_stock_registro = quantidade_stock_registro
            
            print(meus_produto.categoria_produto_registro)
            
            # Se uma nova imagem foi carregada com sucesso, atualiza o campo da URL
            if condicao == True and url_image:
                meus_produto.url_imagem_produto = url_image
                
            db.session.commit()

        return jsonify({"resposta": "dados actualizado com sucesso!", "status": "true"})
        
    except Exception as erro:
        print(f"erro ao editar os dados do produto:{erro}")
        return jsonify({"resposta": "erro ao editar os dados do produtos", "status": "false"})
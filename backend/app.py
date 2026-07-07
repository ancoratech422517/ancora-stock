import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv  # Importa a função para carregar o .env
from routes.api_registrar_empresario import registrar_empresario
from routes.api_registrar_categoria import Registrar_Categoria
from routes.api_buscar_dados_categoria import Buscar_Dados_Categoria
from routes.api_login import Login
from routes.api_registrar_produto import Registrar_Produto
from routes.api_buscar_produto import Buscar_Produto
from routes.api_editar_produto import Editar_Produto
from routes.api_eliminar_produto import Eliminar_Produto
from routes.api_vender_produto import Vender_Produto
from routes.api_buscar_relatorio import Buscar_Relatorio
from routes.api_download_relatorio import Download_Relatorio
from routes.api_dados_dashboard import Dashboard_API
from models.database import db

# Carrega as variáveis do arquivo .env para o ambiente do Python
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuração da Base de Dados usando a variável de ambiente
# O os.getenv('DATABASE_URL') vai buscar o valor que está no seu arquivo .env
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Vincula o SQLAlchemy ao App Flask
db.init_app(app)

# Registro dos Blueprints
app.register_blueprint(registrar_empresario)
app.register_blueprint(Login)
app.register_blueprint(Registrar_Categoria)
app.register_blueprint(Buscar_Dados_Categoria)
app.register_blueprint(Registrar_Produto)
app.register_blueprint(Buscar_Produto)
app.register_blueprint(Editar_Produto)
app.register_blueprint(Eliminar_Produto)
app.register_blueprint(Vender_Produto)
app.register_blueprint(Buscar_Relatorio)
app.register_blueprint(Download_Relatorio)
app.register_blueprint(Dashboard_API)

# Cria as tabelas dentro do contexto correto
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
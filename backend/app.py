import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv  
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

# Carrega as variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# 1. Configuração básica da URI
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 2. Proteção contra instabilidade de rede (Timeouts e Reciclagem)
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    # 'connect_timeout' define quanto tempo (em segundos) o psycopg2 vai esperar para conectar antes de dar erro.
    # Ajustamos para 30 segundos para dar tempo à rede lenta.
    "connect_args": {
        "connect_timeout": 120,
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 10,
        "keepalives_count": 5
    },
    # Recicla as conexões a cada 180 segundos para evitar conexões "fantasmas" que caíram na rede instável
    "pool_recycle": 180,
    # Verifica se a conexão ainda está viva antes de tentar usá-la
    "pool_pre_ping": True
}

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

# Cria as tabelas dentro do contexto correto com tratamento de erro amigável
with app.app_context():
    try:
        db.create_all()
        print("-> Tabelas criadas ou verificadas com sucesso na base de dados!")
    except Exception as e:
        print("\n[AVISO CRÍTICO] Não foi possível conectar à base de dados para criar as tabelas.")
        print("Verifica se estás ligado à internet ou se a rede não caiu.")
        print(f"Erro original: {e}\n")

if __name__ == "__main__":
    app.run(debug=True)
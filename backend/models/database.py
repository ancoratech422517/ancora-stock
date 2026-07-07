from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    nome_registro = db.Column(db.Text , default = "none")
    numero_registro = db.Column(db.Text , default = "none")
    senha_registro = db.Column(db.Text , default = "none")

class Categoria(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    nome_categoria = db.Column(db.Text , default = "none")
    quantidade_produto_categoria = db.Column(db.Integer , default = 0)
    id_empresario = db.Column(db.Text , default = "none")

class Produto(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    nome_produto_registro = db.Column(db.Text , default = "none")
    categoria_produto_registro = db.Column(db.Text , default = "none")
    preco_custo_registro = db.Column(db.Text , default = "none")
    preco_venda_registro = db.Column(db.Text , default = "none")
    quantidade_stock_registro = db.Column(db.Integer , default = 0)
    url_imagem_produto = db.Column(db.Text , default = "none")
    id_empresario = db.Column(db.Integer , nullable = False)

class Relatorios(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    id_empresario = db.Column(db.Integer , nullable = False)
    id_produto_venda = db.Column(db.Integer , nullable = False)
    nome_produto_venda = db.Column(db.Text , default = "none")
    quanidade_produto_venda = db.Column(db.Integer , nullable = False)
    total_pago_produto_venda = db.Column(db.Integer , nullable = False)
    lucro_produto_venda = db.Column(db.Integer , nullable = False)
    categoria_produto_venda = db.Column(db.Text , default = "none")
    data_venda_produto = db.Column(db.DateTime , default = db.func.current_timestamp())







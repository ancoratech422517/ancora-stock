import { useState } from "react";
import "./css/Conteiner_Principal_catalogo_Conteiner_Botton.css"
import { useUserStore } from "../../useUseSotore";
import { EventoSelect } from "../conteiner4-vendas/js/js";
import Conteiner_Principal_Catalogo_Adicionar_Dados_Ao_carrinho from "./js/Conteiner_Principal_Catalogo_Adicionar_Dados_Ao_carrinho";
import { AddToCart } from "./js/Conteiner_Principal_Catalogo_Adicionar_Dados_Ao_carrinho";
export default function Conteiner_Principal_Catalogo_Conteiner_Botton () {

    const {DadosProduto , url_backend , DadosCategoria , setEstadoConteinerAtual , setDadosVenderCatalogo} = useUserStore()
    const xProdutoCatalogo = DadosProduto

    let nao_mostrar_produto_catalogo = true
    if (xProdutoCatalogo.length > 0){
        nao_mostrar_produto_catalogo = false
    }
    const [estadoViewProdutoCatalogo , setestadoViewProdutoCatalogo] = useState(nao_mostrar_produto_catalogo)
    const condicao_estado_view_produto_catalogo = () => {
        switch(estadoViewProdutoCatalogo){
            case true:
                return (
                    <div className="Conteiner_Principal_CAtalogo_Vazio">
                        <h2>Nenhum Catalogo Registrado</h2>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                    </div>
                )
        }
    }
    return (
        <div className="Conteiner_Principal_catalogo_Conteiner_Botton">
            <div className="Conteiner_Principal_Catalogo_Conteiner_Botton_menu_Top">
                <div className="Conteiner_Principal_Catalogo_Conteiner_Botton_menu_TopBox" tabIndex={0}>
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="search" id="pesquisar_produto" placeholder="Buscar produto..." />
                </div>
                <div className="Conteiner_Principal_Catalogo_Conteiner_Botton_menu_TopBox">
                    <select name="categoria_produto_desponivel" id="categoria_produto_desponivel" className="categoria_produto_desponivel">
                        {DadosCategoria.map((dados , index)=>{
                            return(
                                <option value={dados.nome_categoria}>{dados.nome_categoria}</option> 
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="Conteiner_Principal_Catalogo_Botton_Conteiner">
                <div className="Conteiner_Principal_Catalogo_Botton_Conteiner_menu_Top">
                    <li>IMAGEM</li>
                    <li>CATEGORIA</li>
                    <li>NOME</li>
                    <li>PREÇO</li>
                    <li>STOCK</li>
                    <li>AÇÕES</li>
                </div>
                <div className="Conteiner_Principal_Catalogo_Botton_Conteiner_scroll">
                    {DadosProduto.map((dados , index)=>{
                        const url = `${dados.url_imagem_produto}`
                            return(
                                <div className="Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados"> 
                                    <li>
                                        <img src={url} alt="" />
                                    </li>
                                    <li className="categoria_produto_search">{dados.categoria_produto_registro}</li>
                                    <li className="nome_produto_search">{dados.nome_produto_registro}</li>
                                    <li>{dados.preco_venda_registro}</li>
                                    <li>{dados.quantidade_stock_registro}</li>
                                    <li>
                                        <button onClick={()=>{setEstadoConteinerAtual("vendas") , setDadosVenderCatalogo(dados) , setTimeout(() => {
                                            Conteiner_Principal_Catalogo_Adicionar_Dados_Ao_carrinho()
                                            
                                        }, 10) , setTimeout(() => {
                                            AddToCart()
                                        }, 20); }} id="vender">vender</button>
                                    </li>
                                </div> 
                            )
                    })}
                    {condicao_estado_view_produto_catalogo()}
                </div>
            </div>
        </div>
    )
}
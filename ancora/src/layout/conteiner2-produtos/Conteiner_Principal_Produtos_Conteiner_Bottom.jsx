import { useState } from "react";
import "./css/Conteiner_Principal_Produtos_Conteiner_Botton.css"
import { useUserStore } from "../../useUseSotore";
import { Conteiner_Principal_Produto_Eliminar_Produto } from "./js/Conteiner_Principal_Produto_Eliminar_Produto";
export default function Conteiner_Principal_Produtos_Conteiner_Botton () {

    const {setEstadoForm , DadosProduto, url_backend , setOpcaoFormulario , setEditarProduto} = useUserStore()
    const xProdyto = DadosProduto
    let nao_mostrar = true
    if (xProdyto.length > 0 ){
        nao_mostrar = false
    }
  
    const [estadoViewProduto , setestadoViewProduto] = useState(nao_mostrar)
    const condicaoEstadoViewProduto = () => {
        switch(estadoViewProduto){
            case true:
                return (
                    <div className="Conteiner_Principal_Produto_Vazio">
                        <h2>Nenhum Produto Registrado</h2>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                )
        }
    }
    const condicao_editar_produto = (dados) => {
        setEditarProduto(dados)
    }
    return (
        <div className="Conteiner_Principal_Produtos_Conteiner_Botton">
            
            <div className="Conteiner_Principal_Produtos_Conteiner_Botton_Menu_top">
                <h3>Gestão de Produtos</h3>
                <button onClick={()=> {setEstadoForm("registrar_produto") , setOpcaoFormulario("registrar")}}>
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M12 4v16m8-8H4"></path>
                    </svg>
                    Novo Produto
                </button>
            </div>
            <div className="Conteiner_Principal_Produtos_Conteiner_Botton_conteudo">
                <div className="Conteiner_Principal_Produtos_Conteiner_Botton_conteudo_Menu_Top">
                    <li>IMAGEM</li>
                    <li>NOME</li>
                    <li>CATEGORIA</li>
                    <li>CUSTO</li>
                    <li>VENDAS</li>
                    <li>STACK</li>
                    <li>AÇÕES</li>
                </div>
                <div className="Conteiner_Principal_Produtos_Conteiner_Botton_conteudo_Scroll">
                    {DadosProduto.map((dados , index)=>{
                        const URLIMAGE = `${dados.url_imagem_produto}`
                        return(
                                <div className="Conteiner_Principal_Produtos_Conteiner_Botton_conteudo_Scroll_dados">
                                    <li>
                                        <div className="imagem_dados">
                                            <img src={URLIMAGE} alt="" />
                                        </div>
                                    </li>
                                    <li>{dados.nome_produto_registro}</li>
                                    <li>{dados.categoria_produto_registro}</li>
                                    <li>{dados.preco_custo_registro}</li>
                                    <li>{dados.preco_venda_registro}</li>
                                    <li>{dados.quantidade_stock_registro}</li>
                                    <li>
                                        <button onClick={()=>{setEstadoForm("registrar_produto") ,setOpcaoFormulario("editar") , condicao_editar_produto(dados)}}>Editar</button>
                                        <button onClick={()=>{Conteiner_Principal_Produto_Eliminar_Produto(dados.id_empresario , dados.id)}}>Eliminar</button>
                                    </li>
                                </div>
                                

                        )
                    })}
                    {condicaoEstadoViewProduto ()}
                </div>
            </div>
            
        </div>
    )
}
import { useState } from "react";
import "./css/Conteiner_principal_Produtos.css"
import Conteiner_principal_dashboard_menu_top from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import Conteiner_Principal_Produtos_Conteiner_Botton from "./Conteiner_Principal_Produtos_Conteiner_Bottom";
import { Conteiner_Principal_Produto_Registrar_Produto } from "./js/Conteiner_Principal_Produtos_Registrar_Produto";
import { Conteiner_Principal_Produto_Editar_Produto } from "./js/Conteiner_Principal_Produto_Editar_Produto";
import { useUserStore } from "../../useUseSotore";
import LoadingCarro from "../conteiner-loading/loading-carro";
export default function Conteiner_Principal_Produtos () {
    const {EstadoForm , setEstadoForm , DadosCategoria , OpcaoFormulario , EditarProduto} = useUserStore()
    const [condicaoEstadoLoading, setcondecaoEstadoLoading] = useState(false)
    const condicao_estado_loading = () => {
        switch(condicaoEstadoLoading){
            case true:
                return(
                    <LoadingCarro />
                )
        }
    }
    const condicao_dados_editar = () => {
        const nome_produto_registro = document.getElementById("nome_produto_registro")
        const categoria_produto_registro = document.getElementById("categoria_produto_registro")
        const preco_custo_registro = document.getElementById("preco_custo_registro")
        const preco_venda_registro = document.getElementById("preco_venda_registro")
        const quantidade_stock_registro = document.getElementById("quantidade_stock_registro")
        nome_produto_registro.value = EditarProduto.nome_produto_registro || ""
        categoria_produto_registro.value = EditarProduto.categoria_produto_registro || ""
        preco_custo_registro.value = EditarProduto.preco_custo_registro || ""
        preco_venda_registro.value = EditarProduto.preco_venda_registro || ""
        quantidade_stock_registro.value = EditarProduto.quantidade_stock_registro || ""
    }

    const condicao_opcao_formulario = () => {
        switch(OpcaoFormulario){
            case "registrar":
                return (
                    <button className="btn1" onClick={()=>{Conteiner_Principal_Produto_Registrar_Produto(setEstadoForm , setcondecaoEstadoLoading)}}>Registrar produto</button>
                )
            case "editar":
                
                return(
                    <button className="btn1" onClick={()=>{Conteiner_Principal_Produto_Editar_Produto(setEstadoForm , setcondecaoEstadoLoading)}} >Editar produto</button>
                )
        }
    }
    const condicao_EstadoForm = () => {
        switch(EstadoForm){
            
            case "registrar_produto":
                setTimeout(() => {
                    condicao_dados_editar()
                }, 10);
                return (
                    <div className="Conteiner_Principal_Produtos_Conteiner_Botton_Registrar_Produto">
                        <div className="Conteiner_Principal_Produtos_Conteiner_Botton_Registrar_Produto_formulario">
                            <h2>Registra um novo Produto</h2>
                            <input type="text" id="nome_produto_registro" placeholder="Digite o nome do produto" />
                            <select name="categoria_produto" id="categoria_produto_registro">
                                {DadosCategoria.map((dados , index)=>{
                                    return(
                                        <option value={dados.nome_categoria}> {dados.nome_categoria} </option>
                                    )
                                })}
                            </select>
                            <input type="number" id="preco_custo_registro" placeholder="Preço de Custo" />
                            <input type="number" id="preco_venda_registro" placeholder="Digite o preço de venda" />
                            <input type="number" id="quantidade_stock_registro" placeholder="digite a quantidade em stock" />
                            <label htmlFor="imagem_produto_registro">carregar imagem do produto</label>
                            <input type="file" name="imagem_produto_registro" id="imagem_produto_registro" style={{display:"none"}} />
                            {condicao_opcao_formulario()}
                            <button className="btn2" onClick={()=> {setEstadoForm("none")}}>cancelar registro</button>
                        </div>
                        {condicao_estado_loading()}
                    </div>
                )
            
        }
    }
    return (
        <div className="Conteiner_principal_Produtos">
            <Conteiner_principal_dashboard_menu_top />
            <Conteiner_Principal_Dashboard_Menu_Top_Botton />
            <Conteiner_Principal_Produtos_Conteiner_Botton />
            {condicao_EstadoForm ()}
        </div>
    )
}
import { useState } from "react";
import "./css/Conteiner_principal_dashboard_menu_top_botton.css"
import { Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar } from "./js/Coteiner_Principal_dashboard_Menu_Top_Botton_js";
import { useUserStore } from "../../useUseSotore";
import { Conteiner_Principal_BuscarDados_Categoria } from "../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
import { Conteiner_Principal_BuscarDados_Produto } from "../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
import { Conteiner_Principal_Catalogo_Pesquisar_Produto } from "../conteiner5-catalogo/js/Conteiner_Principal_Catalogo_Pesuisar_Produto";
import { Conteiner_Pricipal_Buscar_Dados_Relatorio_Empresario } from "../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
import { Conteiner_Principal_Dashboard_Buscar_Dados } from "./js/Conteiner_Principal_Dahsboard_buscar_dados";
export function Conteiner_Principal_Dashboard_Menu_Top_Botton (){
    const {setEstadoConteinerAtual} = useUserStore()
    const search = () => {
        Conteiner_Principal_Catalogo_Pesquisar_Produto()
    }
    return(
        <div className="Conteiner_principal_dashboard_menu_top_botton">
            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box preenchimento_azul" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "dashboard") , Conteiner_Principal_Dashboard_Buscar_Dados()}}>
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
            </div>
            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "produtos") , Conteiner_Principal_BuscarDados_Produto()}}>
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                Produtos
            </div>
            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "categoria") , Conteiner_Principal_BuscarDados_Categoria()}}>
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Categorias
            </div>
            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "vendas")}}>
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Vendas
            </div>

            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "catalogo") , setTimeout(() => {
                search()
            }, 100);}}> 
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Catálogo
            </div>
            <div className="Conteier_Principal_Dashboard_Menu_Top_Botton_Box" onClick={(e)=>{Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar(e , setEstadoConteinerAtual , "relatorio") , Conteiner_Pricipal_Buscar_Dados_Relatorio_Empresario()}}>
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Relatórios
            </div>
        </div>
    )
} 


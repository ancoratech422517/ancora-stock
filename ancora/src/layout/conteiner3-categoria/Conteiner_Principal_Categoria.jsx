import { useState } from "react";
import "./css/Conteiner_Principal_Categoria.css"
import Conteiner_principal_dashboard_menu_top from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import Conteiner_Principal_Categoria_Conteiner_Botton from "./Conteiner_Principal_Categoria_Conteiner_Botton";
import { Conteiner_Principal_Categoria_Registrar_Categoria } from "./js/Conteiner_Principal_Categoria_Registrar_categoria";
import { Conteiner_Principal_BuscarDados_Categoria } from "../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
import { useUserStore } from "../../useUseSotore";

export default function Conteiner_Principal_Categoria () {
    const {EstadoForm , setEstadoForm} = useUserStore()
    const condicao_setEstadoForm = () => {
        switch(EstadoForm){
            case "registrar_categoria":
                return(
                    <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Registrar_Categoria">
                        <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Registrar_Categoria_formulario">
                            <h2>Rgistrar uma nova categoria</h2>
                            <input type="text" name="nome_categoria" id="nome_categoria" placeholder="Digite o nome da categoria" />
                            <button className="btnCategoriaAdd" onClick={()=>{Conteiner_Principal_Categoria_Registrar_Categoria(setEstadoForm , Conteiner_Principal_BuscarDados_Categoria)}}>Registrar nova categoria</button>
                            <button className="btnCategoriaCancelar" onClick={()=>{setEstadoForm("none")}}>Cancelar registro</button>
                        </div>
                    </div>
                )
        }
    }
    return(
        <div className="Conteiner_Principal_Categoria">
            <Conteiner_Principal_Categoria_Conteiner_Botton />
            {condicao_setEstadoForm()}
        </div>
    )
}
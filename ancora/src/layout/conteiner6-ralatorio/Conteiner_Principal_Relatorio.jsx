import { useState } from "react";
import "./css/Conteiner_Principal_relatorio.css"
import Conteiner_principal_dashboard_menu_top from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import Conteiner_Principal_Relatorio_Conteiner_Botton from "./Conteiner_Principal_Relatorio_Conteiner_Botton";
export default function Conteiner_Principal_Relatorio(){
    return (
        <div className="Conteiner_Principal_relatorio">
            <Conteiner_principal_dashboard_menu_top />
            <Conteiner_Principal_Dashboard_Menu_Top_Botton />
            <Conteiner_Principal_Relatorio_Conteiner_Botton />
        </div>
    )
}
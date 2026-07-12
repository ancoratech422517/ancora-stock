import { useState } from "react";
import Conteiner_principal_dashboard_menu_top from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import Conteiner_Principal_Vendas_Conteiner_Botton from "./Conteiner_Principal_Vendas_Conteiner_Botton";
import "./css/Conteiner_Principal_Vendas.css"


export default function Conteiner_Principal_Vendas () {
    return (
        <div className="Conteiner_Principal_Vendas">
            <Conteiner_Principal_Vendas_Conteiner_Botton />
        </div>
    )
}
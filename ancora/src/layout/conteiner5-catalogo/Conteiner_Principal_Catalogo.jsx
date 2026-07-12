import { useState } from "react";
import "./css/Conteiner_Principal_Catalogo.css"
import Conteiner_principal_dashboard_menu_top from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "../conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import Conteiner_Principal_Catalogo_Conteiner_Botton from "./Conteiner_Principal_Catalogo_Conteiner_Botton";
export default function Conteiner_Prinicipal_Catalogo () {
    return (
        <div className="Conteiner_Principal_Catalogo">
            <Conteiner_Principal_Catalogo_Conteiner_Botton />
        </div>
    )
}
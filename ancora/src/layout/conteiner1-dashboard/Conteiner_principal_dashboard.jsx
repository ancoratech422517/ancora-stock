import { useState } from "react";
import "./css/Conteiner_Principal_Dashboard.css"
import Conteiner_principal_dashboard_menu_top from "./Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "./Conteiner_principal_dashboard_menu_top_botton";
import { Conteiner_Principal_Dashboard_Scroll } from "./Conteiner_Principal_dashboard_scroll";

export default function Conteiner_Principal_Dashboard (){
    return (
        <div className="Conteiner_Principal_Dashboard">
            <Conteiner_Principal_Dashboard_Scroll />
        </div>
    )
}
import { useState } from "react";
import "./css/Conteiner_Principal_Dashboard_Scroll.css"
import { Conteiner_Principal_Dashboard_Scroll_Dash_1 } from "./Conteiner_Principal_dashboard_scroll_dash_1";
import Conteiner_Principal_Dashboard_Scroll_Dash2 from "./Conteiner_Principal_dashboard_scroll_dash2";
import Coneiner_Principal_Dashboard_Scroll_Dash3 from "./Conteiner_principal_dashboard_scroll_dash3";
export function Conteiner_Principal_Dashboard_Scroll () {
    return (
        <div className="Conteiner_Principal_Dashboard_Scroll">
            <Conteiner_Principal_Dashboard_Scroll_Dash_1 />
            <Conteiner_Principal_Dashboard_Scroll_Dash2 />
            <Coneiner_Principal_Dashboard_Scroll_Dash3 />
        </div>
    )
}
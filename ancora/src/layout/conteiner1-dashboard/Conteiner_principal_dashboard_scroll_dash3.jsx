import { useState } from "react";
import "./css/Coneiner_Principal_Dashboard_Scroll_Dash3.css"
import Grafico3 from "./graficos/grafico3";
export default function Coneiner_Principal_Dashboard_Scroll_Dash3 (){
    return(
        <div className="Coneiner_Principal_Dashboard_Scroll_Dash3">
            <div className="Coneiner_Principal_Dashboard_Scroll_Dash3_menu_top">
                <h3>Lucro por Categoria</h3>
            </div>
            <div className="Coneiner_Principal_Dashboard_Scroll_Dash3_grafico">
                <Grafico3 />
            </div>
        </div>
    )
}
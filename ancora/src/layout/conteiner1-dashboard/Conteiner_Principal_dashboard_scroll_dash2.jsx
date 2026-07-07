import { useState } from "react";
import "./css/Conteiner_Principal_Dashboard_Scroll_Dash2.css"
import { Grafico1 } from "./graficos/grafico1";
import Grafico2 from "./graficos/grafico2";

export default function Conteiner_Principal_Dashboard_Scroll_Dash2 () {
    return(
        <div className="Conteiner_Principal_Dashboard_Scroll_Dash2">
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash2Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash2BoxMenuTop">
                    <h3>Vendas diarias dos (ultimos 7 dias)</h3>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Grafico">
                    <Grafico1 />
                </div>
            </div>
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash2Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash2BoxMenuTop">
                    <h3>Vendas Mensais (Ultimos 6 meses) </h3>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Grafico">
                    <Grafico2 />
                </div>
            </div>
        </div>
    )
}
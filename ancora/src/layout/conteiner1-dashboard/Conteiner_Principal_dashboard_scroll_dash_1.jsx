import { useState } from "react";
import "./css/Conteiner_Principal_Dashboard_Scroll_Dash_1.css"
import { useUserStore } from "../../useUseSotore";
export function Conteiner_Principal_Dashboard_Scroll_Dash_1 (){
    const {DadosDashboard} = useUserStore()
    return(
        <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1">
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <div><h3>Vendas hoje</h3></div>
                    <div>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <b>AOA {DadosDashboard.cards?.vendas_hoje_valor || 0} Kz </b>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <li> {DadosDashboard.cards?.vendas_hoje_quantidade || 0} vendas</li>
                </div>
            </div>
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <div><h3>Lucro Total</h3></div>
                    <div>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                    </div>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <b>AOA {DadosDashboard.cards?.lucro_total_acumulado || 0} Kz</b>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <li>Todo Periodo</li>
                </div>
            </div>
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <div><h3>Stcok Baixo</h3></div>
                    <div>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <b> {DadosDashboard.cards?.itens_stock_baixo || 0} </b>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <li>Itens com menor que 5 unidades</li>
                </div>
            </div>
            <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box">
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <div><h3>Total Produtos</h3></div>
                    <div>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <b>{DadosDashboard.cards?.total_produtos_cadastrados || 0}</b>
                </div>
                <div className="Conteiner_Principal_Dashboard_Scroll_Dash_1_Box_caxa">
                    <li>Cadastrados</li>
                </div>
            </div>

        </div>
    )
}
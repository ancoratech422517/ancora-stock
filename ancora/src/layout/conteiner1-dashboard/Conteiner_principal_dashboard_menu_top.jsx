import { useState } from "react";
import "./css/Conteiner_princiapl_dashboard_menu_top.css"

export default function Conteiner_principal_dashboard_menu_top () {
    return (
        <div className="Conteiner_princiapl_dashboard_menu_top">
            <div className="Conteiner_princiapl_dashboard_menu_top_box1">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <span>Ancora Tech - Stock</span>
            </div>
            <div className="Conteiner_princiapl_dashboard_menu_top_box2">
                <button>
                    <svg id="themeIcon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

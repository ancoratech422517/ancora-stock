import { useState } from "react";
import "./css/Conteiner_Principal_Relatorio_Conteiner_Botton.css"
import { useUserStore } from "../../useUseSotore";
import {Conteiner_Principal_Relatorio_Buscar_Dados} from "./js/Conteiner_Principal_Relatorio_Buscar_Dados";
import {Conteiner_Principal_Relatorio_Buscar_Mes_Especifico} from "./js/Conteiner_Principal_Relatorio_Buscar_Mes_Especifico";
import {ExportarRelatorioParaExcel} from "./js/Conteiner_Principal_Relatorio_Download";
export default function Conteiner_Principal_Relatorio_Conteiner_Botton (){
    const {DadosRelatorio} = useUserStore()
    const xRelatorio = DadosRelatorio
    let nao_mostrar_relatorio = true
    if(xRelatorio.length > 0){
        nao_mostrar_relatorio = false
    }
    const [estadoViewRelatorio , setestadoViewRelatorio] = useState(nao_mostrar_relatorio)
    const condicao_estado_view_relatorio = () => {
        switch(estadoViewRelatorio){
            case true:
                return (
                    <div className="Conteiner_Principal_Relatorio_Vazio">
                        <h2>Nenhum Relatorio Registrado</h2>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                )
        }
    }
    return (
        <div className="Conteiner_Principal_Relatorio_Conteiner_Botton">
            <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_menu_Top">
                <h3>Relatorio de Vendas</h3>
                <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_menu_Top_Box">
                    <button onClick={() => Conteiner_Principal_Relatorio_Buscar_Dados("hoje")}>Hoje</button>
                    <button onClick={() => Conteiner_Principal_Relatorio_Buscar_Dados("semana")}>Semana</button>
                    <button onClick={() => Conteiner_Principal_Relatorio_Buscar_Dados("mes")}>Mês</button>
                    <button onClick={() => Conteiner_Principal_Relatorio_Buscar_Dados("ano")}>Ano</button>
                    <button onClick={() => Conteiner_Principal_Relatorio_Buscar_Dados("todos")}>Todos</button>
                    <input 
                        type="datetime-local" 
                        onChange={async (e) => {
                        const valorData = e.target.value; // Retorna algo como "2026-07-06T11:00"
                        
                        // Se o usuário limpar o campo, não faz nada
                        if (!valorData) return;

                        // 1. Separa a data da hora pegando a primeira parte (YYYY-MM-DD)
                        const apenasData = valorData.split("T")[0]; 
                        
                        // 2. Separa as partes do ano, mês e dia
                        const [anoStr, mesStr] = apenasData.split("-");
                        
                        // 3. Converte para número inteiro (removendo zeros à esquerda, ex: "07" vira 7)
                        const ano = Number(anoStr);
                        const mes = Number(mesStr);

                        // 4. Dispara a busca instantânea para o backend
                        await Conteiner_Principal_Relatorio_Buscar_Mes_Especifico(mes, ano);
                        }}
                        className="border border-gray-300 rounded-lg p-2 text-sm bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                </div>
                <button onClick={ExportarRelatorioParaExcel}>Exportar Excel</button>
            </div>
            <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner">
                <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner_menu_Top">
                    <li>DATA</li>
                    <li>PRODUTO</li>
                    <li>QUANTIDADE</li>
                    <li>TOTAL</li>
                    <li>LUCRO</li>
                </div>
                <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner_scroll">
                    {DadosRelatorio.map((item, index) =>{
                        return(
                            <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner_scroll_dados" key={index}>
                                <li>{item.data_venda_produto}</li>
                                <li>{item.nome_produto_venda}</li>
                                <li>{item.quanidade_produto_venda}</li>
                                <li>{item.total_pago_produto_venda}</li>
                                <li>{item.lucro_produto_venda}</li>
                            </div>
                        )
                    })}
                    {condicao_estado_view_relatorio()}
                </div>
                <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner_btn_acao">
                    <div className="Conteiner_Principal_Relatorio_Conteiner_Botton_Conteiner_btn_acao_dados">
                        <button>anterior</button>
                        <button>1</button>
                        <button>próximo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
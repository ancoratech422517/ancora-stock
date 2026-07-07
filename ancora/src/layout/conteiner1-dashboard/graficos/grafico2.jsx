import React from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {useUserStore} from "../../../useUseSotore"; // Usa o nome exato do teu ficheiro da store (com ou sem chaves, dependendo do export)
import "./css/Grafico2.css";

const Cor_Grafico = [
    "#0A84FF",
    "#087bee",
    "#0a77e4",
    "#0b70d4",
    "#0b6ccc",
    "#0960b8",
    "#085caf"
];

export default function Grafico2() {
    // 1. Puxar o objeto central 'DadosDashboard' da tua store do Zustand
    const dadosDashboard = useUserStore((state) => state.DadosDashboard);

    // 2. Salvaguarda para quando os dados ainda estão a ser procurados no Flask
    if (!dadosDashboard || !dadosDashboard.grafico_vendas_mensais) {
        return (
            <div className="Grafico2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>A carregar gráfico de tendências...</p>
            </div>
        );
    }

    // 3. Extrair dinamicamente os meses e os valores de faturação reais
    const labelsMeses = dadosDashboard.grafico_vendas_mensais.map((dados) => dados.mes);
    const valoresVendas = dadosDashboard.grafico_vendas_mensais.map((dados) => dados.vendas);

    return (
        <div className="Grafico2">
            <Line
                data={{
                    labels: labelsMeses, // Injeta os meses ['Janeiro', 'Fevereiro'...] do teu backend
                    datasets: [
                        {
                            label: "Vendas",
                            data: valoresVendas, // Injeta os valores numéricos reais
                            borderColor: "#0A84FF", // Cor da linha principal do gráfico
                            backgroundColor: Cor_Grafico[0], // Cor dos pontos de marcação
                            borderWidth: 2,
                            tension: 0.3, // Deixa a curva da linha ligeiramente suave/suave como no teu Excel
                            fill: false
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        // Corrigido de 'lagende' para 'legend' que é a propriedade correta do Chart.js
                        legend: {
                            labels: { color: "#333" }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let value = context.raw || 0;
                                    return ` Vendas: AOA ${value.toLocaleString('pt-AO')}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString('pt-AO') + " Kz";
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}
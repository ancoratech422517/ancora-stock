import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {useUserStore} from "../../../useUseSotore";
import "./css/grafico1.css";

const Cor_Grafico = [
    "#0A84FF",
    "#087bee",
    "#0a77e4",
    "#0b70d4",
    "#0b6ccc",
    "#0960b8",
    "#085caf"
];

export function Grafico1() {
    // 1. Puxar o objeto 'DadosDashboard' da tua Store do Zustand (conforme vimos no DevTools)
    const dadosDashboard = useUserStore((state) => state.DadosDashboard);

    // 2. Criar um fallback seguro para quando os dados da API ainda não foram carregados
    if (!dadosDashboard || !dadosDashboard.grafico_vendas_diarias) {
        return (
            <div className="grafico1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>A carregar dados do gráfico...</p>
            </div>
        );
    }

    // 3. Fazer o map dinâmico dos dados reais convertendo 'dia' para label e 'vendas' para value
    const labelsGrafico = dadosDashboard.grafico_vendas_diarias.map((dados) => dados.dia);
    const valoresGrafico = dadosDashboard.grafico_vendas_diarias.map((dados) => dados.vendas);

    return (
        <div className="grafico1">
            <Bar
                data={{
                    // Injeta dinamicamente os arrays criados a partir do Zustand
                    labels: labelsGrafico, 
                    datasets: [
                        {
                            label: "Vendas (Kz)",
                            data: valoresGrafico,
                            backgroundColor: Cor_Grafico,
                            borderWidth: 1,
                            borderRadius: 8 // Mantém o teu estilo moderno de colunas arredondadas
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: "#333" }
                        },
                        // Opcional: Adiciona formatação em Kz Angolano ao passar o mouse nas barras
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
                                // Formata os números do eixo Y para a moeda local de forma limpa
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
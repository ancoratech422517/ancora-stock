import React, { useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import {useUserStore} from "../../../useUseSotore"; // Ajusta para o nome exato do teu ficheiro da store
import "./css/Grafico3.css";

const Cor_Grafico = [
  "#0A84FF",
  "#087bee",
  "#0a77e4",
  "#0b70d4",
  "#0b6ccc",
  "#0960b8",
  "#085caf"
];

export default function Grafico3() {
  const [tipoGrafico, setTipoGrafico] = useState("bar");
  
  // 1. Puxar o objeto 'DadosDashboard' da tua Store do Zustand
  const dadosDashboard = useUserStore((state) => state.DadosDashboard);

  // 2. Fallback para evitar erros enquanto a API do Flask responde
  if (!dadosDashboard || !dadosDashboard.grafico_lucro_categoria) {
    return (
      <div className="Grafico3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>A carregar análise de lucros por categoria...</p>
      </div>
    );
  }

  // 3. Extrair os dados reais mapeados do teu backend
  const categorias = dadosDashboard.grafico_lucro_categoria.map((dados) => dados.categoria);
  const lucrosKz = dadosDashboard.grafico_lucro_categoria.map((dados) => dados.lucro_kz);
  const lucrosAcumulados = dadosDashboard.grafico_lucro_categoria.map((dados) => dados.lucro_acumulado);

  return (
    <div className="Grafico3">
      {tipoGrafico === "bar" ? (
        <Bar
          data={{
            labels: categorias, // Nome das categorias reais (ex: 'Auriculares', 'Construção')
            datasets: [
              {
                label: "Lucro Kz",
                data: lucrosKz, // Valor da barra azul
                backgroundColor: Cor_Grafico,
                borderRadius: 8,
                borderWidth: 1,
                order: 2 // Garante que a barra fica atrás da linha
              },
              {
                label: "Lucro Acumulado",
                data: lucrosAcumulados, // A curva real de tendência acumulada
                borderColor: "#333",
                borderWidth: 2,
                type: "line",
                fill: false,
                tension: 0.2, // Suaviza a linha preta do gráfico
                order: 1 // Garante que a linha fica desenhada por cima das barras
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: "#333" } },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let value = context.raw || 0;
                    return ` ${context.dataset.label}: AOA ${value.toLocaleString('pt-AO')}`;
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
      ) : (
        <Line
          data={{
            labels: categorias,
            datasets: [
              {
                label: "Lucro Kz",
                data: lucrosKz,
                borderColor: Cor_Grafico[0],
                backgroundColor: Cor_Grafico,
                borderWidth: 2,
                tension: 0.2
              },
              {
                label: "Lucro Acumulado",
                data: lucrosAcumulados,
                borderColor: "#333",
                borderWidth: 1,
                fill: false
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: "#333" } },
              title: {
                display: true,
                text: "Gráfico de Lucro Kz",
                fontSize: 24,
                padding: 20
              }
            }
          }}
        />
      )}
    </div>
  );
}
import { useUserStore } from "../../../useUseSotore";

export async function Conteiner_Principal_Relatorio_Buscar_Mes_Especifico(mes, ano) {
    try {
        const url = useUserStore.getState().url_backend;
        const dadosUsuario = useUserStore.getState().dados_usuario;

        // Faz o fetch passando os Query Parameters ?mes=...&ano=...
        const buscar_relatorio_venda = await fetch(
            `${url}/buscar_relatorio/${dadosUsuario.id}?mes=${mes}&ano=${ano}`, 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!buscar_relatorio_venda.ok) {
            throw new Error(`Erro na requisição: ${buscar_relatorio_venda.status}`);
        }

        const relatorio_venda = await buscar_relatorio_venda.json();
        
        // Atualiza instantaneamente o estado global do Zustand
        useUserStore.setState({ DadosRelatorio: relatorio_venda });

    } catch (error) {
        console.error("Erro ao buscar relatório mensal:", error);
        useUserStore.setState({ DadosRelatorio: [] });
    }
}
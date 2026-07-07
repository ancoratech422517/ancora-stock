import { useUserStore } from "../../../useUseSotore";

export async function Conteiner_Principal_Relatorio_Buscar_Dados(dados) {
    try {
        const url = useUserStore.getState().url_backend;
        const dadosUsuario = useUserStore.getState().dados_usuario;
        const DadosRelatorioGet = useUserStore.getState().DadosRelatorio;
        const buscar_relatorio_venda = await fetch(`${url}/buscar_relatorio/${dadosUsuario.id}?periodo=${dados}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verifica se a resposta do servidor foi bem-sucedida (status 200-299)
        if (!buscar_relatorio_venda.ok) {
            throw new Error(`Erro na requisição: ${buscar_relatorio_venda.status}`);
        }

        const relatorio_venda = await buscar_relatorio_venda.json();
        
        // CRUCIAL: Retorna os dados para que o seu componente possa usá-los!
        useUserStore.setState({ DadosRelatorio: relatorio_venda });
      

    } catch (error) {
        console.error("Erro ao buscar relatório no frontend:", error);
        return []; // Retorna um array vazio para não quebrar o .map() no componente
    }
}
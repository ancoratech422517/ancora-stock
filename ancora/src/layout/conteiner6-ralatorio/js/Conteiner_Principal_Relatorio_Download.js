import { useUserStore } from "../../../useUseSotore";

export function ExportarRelatorioParaExcel(filtroAtual = "todos", mesEspecifico = null, anoEspecifico = null) {
    // 1. Pega as configurações de URL e os dados atuais do utilizador no Zustand
    const urlBackend = useUserStore.getState().url_backend;
    const dadosUsuario = useUserStore.getState().dados_usuario;
    const dadosVendas = useUserStore.getState().DadosRelatorio;

    // 2. Validação simples: se não houver registros na tabela, avisa o utilizador e interrompe
    if (!dadosVendas || dadosVendas.length === 0) {
        alert("Não existem dados disponíveis para exportar neste período.");
        return;
    }

    // 3. Monta os parâmetros de consulta (Query Parameters) para a URL
    let parametrosQuery = `periodo=${filtroAtual}`;

    // Se o utilizador estiver a usar uma busca por mês específico do histórico, anexa à URL
    if (mesEspecifico && anoEspecifico) {
        parametrosQuery = `mes=${mesEspecifico}&ano=${ano}&periodo=todos`;
    }

    // 4. Cria a URL final apontando para o endpoint do seu novo Blueprint do Flask
    const urlFinal = `${urlBackend}/exportar_excel/${dadosUsuario.id}?${parametrosQuery}`;

    // 5. Dispara o download nativo do arquivo .xlsx pelo navegador
    window.location.href = urlFinal;
}
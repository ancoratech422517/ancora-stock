import { useUserStore } from "../../../useUseSotore";

export default function Conteiner_Principal_Catalogo_Adicionar_Dados_Ao_carrinho () {
    const DadosVenderCatalogo = useUserStore.getState().DadosVenderCatalogo
    const produto = document.getElementById("produto")
    const quantidade = document.getElementById("quantidade")
    const total = document.getElementById("total")
    const stock = document.getElementById("stock")

    produto.value = DadosVenderCatalogo.nome_produto_registro
    stock.value = DadosVenderCatalogo.quantidade_stock_registro

        // const botoao = document.getElementById('vender');
        // botoao.addEventListener('click', () => {
        //     const selectElement = document.getElementById('produto');
        //     alert("entrou")
        //     // 1. Get the currently selected option
        //     const selectedOption = selectElement.options[selectElement.selectedIndex];

        //     if (selectedOption) {
        //         const optionPrice = selectedOption.getAttribute("data-categoria-produto");
        //         const id_produto = selectedOption.getAttribute("id-produto")
        //         const preco_custo_produto = selectedOption.getAttribute("preco-custo")

        //         // atualize os atributos do select
        //         selectElement.setAttribute('categoria-produto', optionPrice);
        //         selectElement.setAttribute('id_produto' , id_produto )
        //         selectElement.setAttribute("preco-custo-select" , preco_custo_produto)
                
        //         // Log to console to verify it works
        //         console.log("Select attribute updated to:", selectElement.getAttribute('categoria-produto'));
        //     }
        // });
    
}

export function AddToCart () {
            const selectElement = document.getElementById('produto');
  
            // 1. Get the currently selected option
            const selectedOption = selectElement.options[selectElement.selectedIndex];

            if (selectedOption) {
                const optionPrice = selectedOption.getAttribute("data-categoria-produto");
                const id_produto = selectedOption.getAttribute("id-produto")
                const preco_custo_produto = selectedOption.getAttribute("preco-custo")
                const preco_venda = selectedOption.getAttribute("preco-venda")

                // atualize os atributos do select
                selectElement.setAttribute('categoria-produto', optionPrice);
                selectElement.setAttribute('id_produto' , id_produto )
                selectElement.setAttribute("preco-custo-select" , preco_custo_produto)
                selectElement.setAttribute("preco-venda-select" , preco_venda)
                
                
                // Log to console to verify it works
                console.log("Select attribute updated to:", selectElement.getAttribute('categoria-produto'));
            }

} 
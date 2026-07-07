
export function EventoSelect () {

    const selectElement = document.getElementById('produto');
    selectElement.addEventListener('change', (e) => {
        // 1. Get the currently selected option
        const selectedOption = e.target.options[e.target.selectedIndex];

        // 2. Grab the data attribute from the option
        const optionPrice = selectedOption.getAttribute("data-categoria-produto");
        const id_produto = selectedOption.getAttribute("id-produto")
        const preco_custo_produto = selectedOption.getAttribute("preco-custo")
        const quantidade_stock_produto = selectedOption.getAttribute("quantidade-stock")
        const preco_venda = selectedOption.getAttribute("preco-venda")
        const stock = document.getElementById("stock").value = quantidade_stock_produto

        if (optionPrice) {
        selectElement.setAttribute('categoria-produto', optionPrice);
        selectElement.setAttribute('id_produto' , id_produto )
        selectElement.setAttribute("preco-custo-select" , preco_custo_produto)
        selectElement.setAttribute("preco-venda-select" , preco_venda)
        
        // Log to console to verify it works
        console.log("Select attribute updated to:", selectElement.getAttribute('categoria-produto'));
        }
    });

}
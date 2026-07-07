
export function Conteiner_Principal_Catalogo_Pesquisar_Produto (){
    
    const pesquisar_produto = document.querySelector("input[type='search']")
    const Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados = document.querySelectorAll(".Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados")

    if (pesquisar_produto !== ""){
        pesquisar_produto.addEventListener("input" , (e)=>{
            const produto = e.target.value.toLowerCase()
            Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados.forEach((produtos)=>{
                const Produto = produtos.querySelector(".nome_produto_search").textContent.toLowerCase()
                if(Produto.includes(produto)){
                    produtos.style.display = ""
                }
                else{
                    produtos.style.display = "none"
                }
            })
        })
    }
    setTimeout(() => {
            Conteiner_Principal_Pesquisar_Produto_Select()
    }, 10);
}

export function Conteiner_Principal_Pesquisar_Produto_Select () {
    const pesquisar_produto = document.querySelector(".categoria_produto_desponivel")
    const Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados = document.querySelectorAll(".Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados")
    if(pesquisar_produto !==""){
        pesquisar_produto.addEventListener("change" , (e)=>{
            const produto = e.target.value.toLowerCase()
            Conteiner_Principal_Catalogo_Botton_Conteiner_scroll_dados.forEach((produtos)=>{
                const Produto = produtos.querySelector(".categoria_produto_search").textContent.toLowerCase()
                if(Produto.includes(produto)){
                    produtos.style.display = ""
                }
                else{
                    produtos.style.display = "none"
                }
            })

        })

    }
}
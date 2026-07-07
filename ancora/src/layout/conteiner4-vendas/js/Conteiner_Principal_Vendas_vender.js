import { useUserStore } from "../../../useUseSotore"
import { Conteiner_Principal_BuscarDados_Produto } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados"
export async function Conteiner_Principal_Vendas_vender () {
    const url = useUserStore.getState().url_backend
    const id_empresario = useUserStore.getState().dados_usuario.id
    
    const DadosVenderCatalogo = useUserStore.getState().DadosVenderCatalogo
    const produto = document.getElementById("produto")
    const quantidade = document.getElementById("quantidade").value
    const total = document.getElementById("total").value
    const id_produto = produto.getAttribute("id_produto")
    const categoria_produto = produto.getAttribute("categoria-produto")
    const preco_custo_produto = produto.getAttribute("preco-custo-select")
    const preco_venda_produto = produto.getAttribute("preco-venda-select")
    let dados = {
        "nome_produto":produto.value,
        "quantidade_produto":quantidade,
        "total_pago":total,
        "id_produto":id_produto,
        "id_empresario":id_empresario,
        "categoria_produto":categoria_produto,
        "preco_custo":preco_custo_produto,
        "preco_venda_produto":preco_venda_produto
    }
    let novo_dados = {
        "nome_produto":dados.nome_produto,
        "quantidade_produto":dados.quantidade_produto,
        "total_pago":dados.total_pago,
        "id_produto":dados.id_produto,
        "id_empresario":dados.id_empresario,
        "categoria_produto":dados.categoria_produto,
        "preco_custo":dados.preco_custo,
        "preco_venda_produto":dados.preco_venda_produto
    }
   

    
    const vender_produto = await fetch(`${url}/vender_produto` , {
        method:"POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(novo_dados)
    })

    const resposta_backend = await vender_produto.json()
    alert(resposta_backend.resposta)
    Conteiner_Principal_BuscarDados_Produto()
   

}


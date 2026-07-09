import { useUserStore } from "../../../useUseSotore";
import { Conteiner_Principal_BuscarDados_Produto } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";

export async function Conteiner_Principal_Produto_Editar_Produto(setEstadoForm , setcondecaoEstadoLoading) {
    setcondecaoEstadoLoading(true)
    let url = useUserStore.getState().url_backend
    let dadosUsuario = useUserStore.getState().dados_usuario
    let id_produto = useUserStore.getState().EditarProduto.id
    let nome_produto_registro = document.getElementById("nome_produto_registro").value 
    let categoria_produto_registro = document.getElementById("categoria_produto_registro").value
    let preco_custo_registro = document.getElementById("preco_custo_registro").value
    let preco_venda_registro = document.getElementById("preco_venda_registro").value
    let quantidade_stock_registro = document.getElementById("quantidade_stock_registro").value
    let imagem_produto_registro = document.getElementById("imagem_produto_registro")


    let Dados_produto = new FormData()
    Dados_produto.append("nome_registro_produto" , nome_produto_registro)
    Dados_produto.append("categoria_produto_registro" , categoria_produto_registro)
    Dados_produto.append("preco_custo_registro" , preco_custo_registro)
    Dados_produto.append("preco_venda_produto" , preco_venda_registro)
    Dados_produto.append("quantidade_stock_registro" , quantidade_stock_registro)
    Dados_produto.append("id_empresario" , dadosUsuario.id)
    Dados_produto.append("id_produto" , id_produto)
    Dados_produto.append("imagem_produto_registro" , imagem_produto_registro.files[0])


    const registrar_produto = await fetch(`${url}/editar_produto`,{
        method:"post",
        body:Dados_produto
    })
    const resposta_backend = await registrar_produto.json()

    if (resposta_backend.status === "true"){

        Conteiner_Principal_BuscarDados_Produto()
        setEstadoForm("none")
        setcondecaoEstadoLoading(false)
        nome_produto_registro.value = ""
        nome_produto_registro.focus()
        categoria_produto_registro = ""
        preco_custo_registro = ""
        preco_venda_registro = ""
        quantidade_stock_registro = ""

    }
    else{
        alert(resposta_backend.resposta)
    }
    

}

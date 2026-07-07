import { useUserStore } from "../../../useUseSotore";
import { Conteiner_Principal_BuscarDados_Produto } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";

export async function Conteiner_Principal_Produto_Registrar_Produto(setEstadoForm , setcondecaoEstadoLoading) {
    setcondecaoEstadoLoading(true)
    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario
    const nome_produto_registro = document.getElementById("nome_produto_registro").value 
    const categoria_produto_registro = document.getElementById("categoria_produto_registro").value
    const preco_custo_registro = document.getElementById("preco_custo_registro").value
    const preco_venda_registro = document.getElementById("preco_venda_registro").value
    const quantidade_stock_registro = document.getElementById("quantidade_stock_registro").value
    const imagem_produto_registro = document.getElementById("imagem_produto_registro")

    if(!imagem_produto_registro.files.length){
        alert("tens que enviar a imagem do produto")
        return
    }

    const Dados_produto = new FormData()
    Dados_produto.append("nome_registro_produto" , nome_produto_registro)
    Dados_produto.append("categoria_produto_registro" , categoria_produto_registro)
    Dados_produto.append("preco_custo_registro" , preco_custo_registro)
    Dados_produto.append("preco_venda_produto" , preco_venda_registro)
    Dados_produto.append("quantidade_stock_registro" , quantidade_stock_registro)
    Dados_produto.append("imagem_produto_registro" , imagem_produto_registro.files[0])

    const registrar_produto = await fetch(`${url}/registrar_produto/${dadosUsuario.id}`,{
        method:"post",
        body:Dados_produto
    })
    const resposta_backend = await registrar_produto.json()

    if (resposta_backend.status === "true"){
        setEstadoForm("none")
        Conteiner_Principal_BuscarDados_Produto()
        setcondecaoEstadoLoading(false)
    }
    else{
        alert(resposta_backend.resposta)
    }
    

}
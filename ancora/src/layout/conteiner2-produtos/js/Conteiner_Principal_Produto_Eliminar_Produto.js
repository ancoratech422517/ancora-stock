import { useUserStore } from "../../../useUseSotore";
import { Conteiner_Principal_BuscarDados_Produto } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
export async function Conteiner_Principal_Produto_Eliminar_Produto(id_empresario , id_produto) {
    const url = useUserStore.getState().url_backend
    const dados = {
        "id_empresario":id_empresario,
        "id_produto":id_produto
    }

    const Eliminar_Produto = await fetch(`${url}/eliminar_produto`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dados)
    })

    //const resposta_backend = await Eliminar_Produto.json()
    Conteiner_Principal_BuscarDados_Produto()
}
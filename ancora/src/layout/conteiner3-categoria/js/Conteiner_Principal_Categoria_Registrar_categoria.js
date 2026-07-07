import { useUserStore } from "../../../useUseSotore";

export async function Conteiner_Principal_Categoria_Registrar_Categoria(setEstadoForm , Conteiner_Principal_BuscarDados_Categoria) {
    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario
    const nome_categoria = document.getElementById("nome_categoria").value 
    const dados = {
        "nome_categoria":nome_categoria,
        "id_empresario":dadosUsuario.id
    }

    const registrar_categoria = await fetch(`${url}/registrar_categoria` , {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dados)
    })
    const resposta_backend = await registrar_categoria.json()
    alert(resposta_backend.resposta)
    if (resposta_backend.estado === "true"){
        setEstadoForm("none")
        Conteiner_Principal_BuscarDados_Categoria()
    }

}
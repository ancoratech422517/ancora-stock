import { useUserStore } from "../../../useUseSotore"
export async function Conteiner_Principal_Autentificacao_Registro (set_estado_login) {

    const url = useUserStore.getState().url_backend
    const nome_registro = document.getElementById("nome_registro").value
    const numero_registro = document.getElementById("numero_registro").value
    const senha_registro = document.getElementById("senha_registro").value
    const confirmar_senha_registro = document.getElementById("confirmar_senha_registro").value

    const dados = {
        "nome_registro":nome_registro,
        "numero_registro":numero_registro,
        "senha_registro":senha_registro,
        "confirmar_senha_registro":confirmar_senha_registro
    }

    const registrar_novo_empresario = await fetch(`${url}/registrar_empresario` , {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dados)
    })
    const resposta_backend = await registrar_novo_empresario.json()
    set_estado_login("login")

}
import { useUserStore } from "../../../useUseSotore";
import { Conteiner_Principal_BuscarDados_Categoria } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
import { Conteiner_Principal_BuscarDados_Produto } from "../../conteiner8-buscar_dados/Conteiner_Principal_Buscar_Dados";
export async function Conteiner_Principal_Autentificacao_Login(setEstadoConteinerAtual , set_dados_usuario) {
    const url = useUserStore.getState().url_backend
    const numero_login = document.getElementById("numero_login").value
    const senha_login = document.getElementById("senha_login").value

    const dados = {
        "numero_login":numero_login,
        "senha_login":senha_login
    }

    const Login = await fetch(`${url}/login` , {
        method:"post" , 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dados)
    })
    const resposta_backend = await Login.json()

    if (resposta_backend.resposta === "true"){
        setEstadoConteinerAtual("dashboard")
        set_dados_usuario(resposta_backend.dados)
        Conteiner_Principal_BuscarDados_Categoria()
        Conteiner_Principal_BuscarDados_Produto()

    }
    else{
        alert("credencias erradas")
    }
}
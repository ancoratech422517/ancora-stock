import { useState } from "react";
import "./css/Conteiner_Principal_Autentificacao.css"
import Image_form from "../../assets/image_form.jpeg"
import { Conteiner_Principal_Autentificacao_Registro } from "./js/Conteiner_Principal_Autentificacao_registro";
import { Conteiner_Principal_Autentificacao_Login } from "./js/Conteiner_Principal_Autentificacao_Login";
import { useUserStore } from "../../useUseSotore";

export default function Conteiner_Principal_Autentificacao () {
    const [estado_login , set_estado_login] = useState("login")
    const {setEstadoConteinerAtual , set_dados_usuario} = useUserStore()
    const condicao_estado_login = () => {
        switch(estado_login){
            case "login":
                return (
                    <div className="Conteiner_Principal_Autentificacao_Form_Box">
                        <h1>Âncora Tech</h1>
                        <p>seja bem vindo ao sistema de gestão da Âncora Tech</p>
                        <input type="text" name="numero_login" id="numero_login" placeholder="Digite seu Terminal" />
                        <input type="password" id="senha_login" placeholder="Digite sua seha" />
                        <button onClick={()=>{Conteiner_Principal_Autentificacao_Login(setEstadoConteinerAtual , set_dados_usuario)}}>Entrar</button>
                        <li onClick={()=>{set_estado_login("registro")}}>não tenho uma conta</li>
                    </div>

                )
            case "registro":
                return (
                    <div className="Conteiner_Principal_Autentificacao_Form_Box">
                        <h1>Âncora Tech</h1>
                        <p>Crie uma conta no sistema de gestão de stock e vendas de produto</p>
                        <input type="text" name="nome" id="nome_registro" placeholder="Digite seu nome completo" />
                        <input type="text" name="numero" id="numero_registro" placeholder="Digite seu Terminal" />
                        <input type="password" id="senha_registro" placeholder="Digite sua seha" />
                        <input type="password" id="confirmar_senha_registro" placeholder="Confirma a sua senha" />
                        <button onClick={()=>{Conteiner_Principal_Autentificacao_Registro(set_estado_login)}}>Registrar-se</button>
                        <li onClick={()=>{set_estado_login("login")}}>Já tenho uma conta</li>
                    </div>

                )
        }
    }
    return (
        <div className="Conteiner_Principal_Autentificacao">
            <div className="Conteiner_Principal_Autentificacao_Form">
                <div className="Conteiner_Principal_Autentificacao_Form_Box">
                    <img src={Image_form} alt="" />
                </div>
                {condicao_estado_login()}
            </div>
        </div>
    )
}
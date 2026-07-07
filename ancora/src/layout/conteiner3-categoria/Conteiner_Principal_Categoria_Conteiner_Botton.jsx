import { useState } from "react";
import "./css/Conteiner_Principal_Categoria_Conteiner_Botton.css"
import { useUserStore } from "../../useUseSotore";
export default function Conteiner_Principal_Categoria_Conteiner_Botton () {
    const {setEstadoForm , DadosCategoria} = useUserStore()
    const xCategoria = DadosCategoria
    let nao_mostrar_categoria = true
    if (xCategoria.length > 0 ){
        nao_mostrar_categoria = false
    }
    const [estadoViewCategoria , setestadoViewCategoria] = useState(nao_mostrar_categoria)
    const condicao_estado_view_categoria = () => {
        switch(estadoViewCategoria){
            case true:
                return(
                    <div className="Conteiner_Principal_Categoria_Vazio">
                        <h2>Nenhuma Categoria Registrada</h2>
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                    </div>
                )
        }
    }

    return(
        <div className="Conteiner_Principal_Categoria_Conteiner_Botton">
            <div className="Conteiner_Principal_Categoria_Conteiner_Botton_menu_Top">
                <h3>Gestão de Categoria</h3>
                <button onClick={()=>{setEstadoForm("registrar_categoria")}}>
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M12 4v16m8-8H4"></path>
                    </svg>
                    Nova categoria
                </button>
            </div>
            <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Conteiner">
                <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Conteiner_menu_Top">
                    <li>NOME</li>
                    <li>PRODUTOS</li>
                    <li>AÇÕES</li>
                </div>
                
                <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Conteiner_Scroll">
                    {DadosCategoria.map((dados , index)=>{
                    return(
                        <div className="Conteiner_Principal_Categoria_Conteiner_Botton_Conteiner_Scroll_Dados">
                            <li> {dados.nome_categoria} </li>
                            <li>PRODUTOS</li>
                            <li>
                                <button>Eliminar</button>
                            </li>
                        </div>
                    )
                    })} 
                    {condicao_estado_view_categoria()}
                </div>
            </div>
        </div>
    )
}

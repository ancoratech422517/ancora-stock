import { useUserStore } from "../../useUseSotore";
export async function Conteiner_Principal_BuscarDados_Categoria() {
    //função para ir buscar as categorias dos produtos do empresario
    
    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario

    if (dadosUsuario.id){
        try{
            fetch(`${url}/buscar_dados_categoria/${dadosUsuario.id}`)
            .then(res=>res.json())
            .then(dados=>{
                useUserStore.setState({DadosCategoria:dados})
            })
        }
        catch(erro){
            console.log("erro ao buscar os dados da categoria do roduto:",erro)
        }
        
    }

}
export async function Conteiner_Pricipal_Buscar_Dados_Relatorio_Empresario() {
    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario

    if (dadosUsuario.id){
        try{
            fetch(`${url}/buscar_relatorio/${dadosUsuario.id}`)
            .then(res=>res.json())
            .then(dados=>{
                useUserStore.setState({DadosRelatorio:dados})
            })
        }
        catch(erro){
            console.log("erro ao buscar os dados do relatorio do empresario:",erro)
        }
    }
}
export async function Conteiner_Principal_BuscarDados_Produto() {
    //função para ir buscar as categorias dos produtos do empresario
    
    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario

    if (dadosUsuario.id){
        try{
            fetch(`${url}/buscar_produto/${dadosUsuario.id}`)
            .then(res=>res.json())
            .then(dados=>{
                useUserStore.setState({DadosProduto:dados})
            })
        }
        
        catch(erro){
            console.log("erro ao buscar os dados da categoria do roduto:",erro)
        }
        
    }

}

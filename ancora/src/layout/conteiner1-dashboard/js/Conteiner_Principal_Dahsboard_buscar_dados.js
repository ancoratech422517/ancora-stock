
import { useUserStore } from "../../../useUseSotore";
export async function Conteiner_Principal_Dashboard_Buscar_Dados() {

    const url = useUserStore.getState().url_backend
    const dadosUsuario = useUserStore.getState().dados_usuario
    const DadosDasboard = useUserStore.getState().DadosDashboard

    fetch(`${url}/dashboard_dados/${dadosUsuario.id}`)
    .then(res=>res.json())
    .then(dados=>{
        useUserStore.setState({DadosDashboard:dados})
    })

}
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


let url = "https://ancora-stock.onrender.com"

export const useUserStore = create(
  
  persist( 
    (set, get) => ({
    
      EstadoConteinerActual:"autentificacao",
      url_backend:url,
      dados_usuario:"",
      EstadoForm:"none",
      DadosCategoria:[],
      DadosProduto:[],
      OpcaoFormulario:"",
      EditarProduto: [],
      DadosVenderCatalogo:[],
      DadosRelatorio:[],
      DadosDashboard:[],

      setEstadoConteinerAtual: (estado_conteiner_actual) => set({EstadoConteinerActual:estado_conteiner_actual}),
      set_dados_usuario: (dadosUser) => set({dados_usuario:dadosUser}),
      setEstadoForm: (estado_form) => set({EstadoForm:estado_form}),
      setDadosCategoria: (dados_categoria) => set({DadosCategoria:dados_categoria}),
      setDadosProduto: (dados_produto) => set({DadosProduto:dados_produto}),
      setOpcaoFormulario: (opcao_formulario) => set({OpcaoFormulario:opcao_formulario}),
      setEditarProduto: (editar_produto) => set({EditarProduto:editar_produto}),
      setDadosVenderCatalogo: (dados_vender_catalogo) => set({DadosVenderCatalogo:dados_vender_catalogo}),
      setDadosRelatorio: (dados_relatorio) => set({DadosRelatorio:dados_relatorio}),
      setDadosDashboard: (dados_dashboard) => set({DadosDashboard:dados_dashboard}),
    }),
    

    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      
    }
  )
)

import { useState } from "react";
import "./App.css";

import Conteiner_Principal_Dashboard from "./layout/conteiner1-dashboard/Conteiner_principal_dashboard";
import Conteiner_Principal_Produtos from "./layout/conteiner2-produtos/Conteiner_Principal_Produtos";
import Conteiner_Principal_Categoria from "./layout/conteiner3-categoria/Conteiner_Principal_Categoria";
import Conteiner_Principal_Vendas from "./layout/conteiner4-vendas/Conteiner_Principal_Vendas";
import Conteiner_Prinicipal_Catalogo from "./layout/conteiner5-catalogo/Conteiner_Principal_Catalogo";
import Conteiner_Principal_Relatorio from "./layout/conteiner6-ralatorio/Conteiner_Principal_Relatorio";
import Conteiner_Principal_Autentificacao from "./layout/conteiner7-autentificacao/Conteiner_Principal_Autentificacao";
import Conteiner_principal_dashboard_menu_top from "./layout/conteiner1-dashboard/Conteiner_principal_dashboard_menu_top";
import { Conteiner_Principal_Dashboard_Menu_Top_Botton } from "./layout/conteiner1-dashboard/Conteiner_principal_dashboard_menu_top_botton";
import { useUserStore } from "./useUseSotore";
export default function App(){
  const {EstadoConteinerActual} = useUserStore()

  const condicao_conteiner_actual = ()=>{
    switch(EstadoConteinerActual){
      case "dashboard":
        return (

          <Conteiner_Principal_Dashboard />
        )
      case "produtos":
        return(
          <Conteiner_Principal_Produtos />
        )
      case "categoria":
        return(
          <Conteiner_Principal_Categoria />
        )
      case "vendas":
        return(
          <Conteiner_Principal_Vendas />
        )
      case "catalogo":
        return (
          <Conteiner_Prinicipal_Catalogo />
        )
      case "relatorio":
        return (
          <Conteiner_Principal_Relatorio />
        )
      case "autentificacao":
        return(
          <Conteiner_Principal_Autentificacao />
        )

    }
  }
  return (
    <div className="ConteinerPai">
      <Conteiner_principal_dashboard_menu_top />
      <Conteiner_Principal_Dashboard_Menu_Top_Botton />
        {condicao_conteiner_actual()}
    </div>
  )
}

export function Conteiner_Principal_Dashboard_Menu_Top_Botton_Selecionar (e , setEstadoConteinerAtual , nome){
     setEstadoConteinerAtual(nome)
    let Conteier_Principal_Dashboard_Menu_Top_Botton_Box = document.querySelectorAll(".Conteier_Principal_Dashboard_Menu_Top_Botton_Box")
    Conteier_Principal_Dashboard_Menu_Top_Botton_Box.forEach((dados) => {
        dados.classList.remove("preenchimento_azul")
    })
    e.currentTarget.classList.add("preenchimento_azul")
   

}
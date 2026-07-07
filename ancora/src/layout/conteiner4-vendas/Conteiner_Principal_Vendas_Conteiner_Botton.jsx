import { useState } from "react";
import "./css/Conteiner_principa_Vendas_Conteiner_Botton.css"
import { useUserStore } from "../../useUseSotore";
import { Conteiner_Principal_Vendas_vender } from "./js/Conteiner_Principal_Vendas_vender";
import { EventoSelect } from "./js/js";
export default function Conteiner_Principal_Vendas_Conteiner_Botton () {
    const {DadosVenderCatalogo , DadosProduto} = useUserStore()

    let dados_solicitado = ""

    dados_solicitado = DadosVenderCatalogo.nome_produto_registro
    

    return (
        <div className="Conteiner_principa_Vendas_Conteiner_Botton">
            <div className="Conteiner_Principal_Vendas_Conteiner_Botton_menu_Top">
                <h3>Registrar Venda</h3>
            </div>
            <div className="Conteiner_Principal_Vendas_Conteiner_Botton_Conteiner">
                <label htmlFor="produto">Produto</label>
                <select name="produto" id_produto = "" categoria-produto = "" preco-custo-select = "" preco-venda-select id="produto" title="selecione o produto" onClick={()=>{EventoSelect()}}>
                    <option value="none">selecione um produto</option>
                    {DadosProduto.map((dados , index)=>{
                        return(
                            <option preco-venda = {dados.preco_venda_registro} quantidade-stock = {dados.quantidade_stock_registro} preco-custo = {dados.preco_custo_registro} id-produto = {dados.id} data-categoria-produto = {dados.categoria_produto_registro} id="produto" value={dados.nome_produto_registro}>{dados.nome_produto_registro}</option>
                        )
                    })}
                </select>
                <label htmlFor="stock">Stock desponivel</label>
                <input type="text" disabled = "disabled" value={0} id="stock" />
                <label htmlFor="quantidade">Quantidade</label>
                <input type="number" name="quantidade" id="quantidade" onChange={(e) => {
                    const quantidade = parseInt(e.target.value);
                    const preco = parseFloat(DadosVenderCatalogo.preco_venda_registro);
                    const total = quantidade * preco;
                    document.getElementById("total").value = `AOA ${total.toFixed(2)}` || `AOA 0,00`;
                }} />
                <label htmlFor="total">Total</label>
                <input type="text" placeholder="AOA 0,00 " disabled = "disabled" id="total" />
                <button onClick={()=>{Conteiner_Principal_Vendas_vender()}}>Confirmar venda</button>

            </div>
        </div>
    )
}
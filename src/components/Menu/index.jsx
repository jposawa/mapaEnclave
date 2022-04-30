import React from "react";
import {useControle} from "../../hooks";
import { AimOutlined, ShareAltOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {PainelMenu, Botao} from "../";

import styles from "./styles.module.css";

export default function Menu() {
  const location = useLocation();
  const { 
    setMostraModal, 
    mostraBusca, 
    setMostraBusca, 
    mostraAstrogacao, 
    setMostraAstrogacao, 
    planetas, 
    buscaPlaneta 
  } = useControle();
  const buscaRef = React.useRef();

  /* const isThisLocation = (nomePagina) => {
    return location.pathname === `/${nomePagina}`;
  } */

  const chamaBuscaPlaneta = (event) => {
    event.preventDefault();
    const buscaDOM = buscaRef.current;

    buscaPlaneta(buscaDOM?.value);
  }
  
  return (
    <nav className={styles.menu} onClick={() => {setMostraModal(false)}}>
      <span className={styles.fundo}/>

      <button 
        className={mostraAstrogacao ? styles.selecionado : undefined} 
        type="button" 
        onClick={()=>{setMostraAstrogacao(!mostraAstrogacao)}}
      >
        <ShareAltOutlined />
        <label>Navegar</label>
      </button>

      <button 
        className={mostraBusca ? styles.selecionado : undefined} 
        type="button" 
        onClick={()=>{setMostraBusca(!mostraBusca)}}
      >
        <AimOutlined />
        <label>Buscar</label>
      </button>

      <datalist id="listaPlanetas">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>
      
      <PainelMenu mostra={mostraBusca} defineMostra={setMostraBusca}>
        <form onSubmit={chamaBuscaPlaneta}>
          <input type="text" list="listaPlanetas" placeholder="Planeta" ref={buscaRef} />
          <Botao type="submit" secundario className={styles.btnInline}>
            <p>Buscar</p>
          </Botao>
        </form>
      </PainelMenu>
    </nav>
  )
}
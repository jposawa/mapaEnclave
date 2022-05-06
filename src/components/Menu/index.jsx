import React from "react";
import {useControle} from "../../hooks";
import { AimOutlined, ShareAltOutlined, GlobalOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {PainelMenu, Botao, Astrogador} from "../";

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

  const isThisLocation = (nomePagina) => {
    return location.pathname === `/${nomePagina}`;
  }
/*
<button 
        className={mostraAstrogacao ? styles.selecionado : undefined} 
        type="button" 
        onClick={()=>{setMostraAstrogacao(!mostraAstrogacao)}}
      >
        <ShareAltOutlined />
        <label>Navegar</label>
      </button>
*/

  const chamaBuscaPlaneta = (event) => {
    event.preventDefault();
    const buscaDOM = buscaRef.current;

    buscaPlaneta(buscaDOM?.value);
  }

  const alternaBusca = () => {
    setMostraBusca(!mostraBusca);
    setMostraAstrogacao(false);
  }

  const alternaAstrogacao = () => {
    setMostraAstrogacao(!mostraAstrogacao);
    setMostraBusca(false);
  }
  
  return (
    <nav className={styles.menu} onClick={() => {setMostraModal(false)}}>
      <span className={styles.fundo}/>

      <button 
        className={mostraAstrogacao ? styles.selecionado : undefined} 
        type="button" 
        onClick={alternaAstrogacao}
      >
        <ShareAltOutlined />
        <label>Rota</label>
      </button>

      {isThisLocation("astrogacao") ? (
        <Link to="/mapa">
          <GlobalOutlined />
          <label>Mapa</label>
        </Link>
      ) : (
        <button 
          className={mostraBusca ? styles.selecionado : undefined} 
          type="button" 
          onClick={alternaBusca}
        >
          <AimOutlined />
          <label>Buscar</label>
        </button>
      )}
      <datalist id="listaPlanetas">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>
      
      <PainelMenu mostra={mostraBusca} defineMostra={setMostraBusca}>
        <form className={styles.formBusca} onSubmit={chamaBuscaPlaneta}>
          <input type="text" list="listaPlanetas" placeholder="Planeta" ref={buscaRef} />
          <Botao type="submit" secundario className={styles.btnInline}>
            <p>Buscar</p>
          </Botao>
        </form>
      </PainelMenu>

      <PainelMenu mostra={mostraAstrogacao} defineMostra={setMostraAstrogacao}>
        <Astrogador />
      </PainelMenu>
    </nav>
  )
}
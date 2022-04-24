import React from "react";
import { useControle } from "../../hooks/controle.jsx";
import {ShareAltOutlined} from "@ant-design/icons";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal, Mapa } from "../../components";

import styles from "./styles.module.css";

export default function PaginaMapa() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);
  const [mostraAstrogador, setMostraAstrogador] = React.useState(true);

  return (
    <>
      <div className={styles.paginaMapa} onClick={() => {setMostraAstrogador(false)}}>

        <section className={styles.slotMapa}>
          <Mapa />
        </section>
        
      </div>

      {/* <section className={`${styles.slotAstrogador} ${mostraAstrogador ? "" : styles.astrogadorFechado}`}>
        <button 
          className={styles.chamaAstrogador} 
          type="button" 
          onClick={() => {setMostraAstrogador(!mostraAstrogador)}}
        >
          <ShareAltOutlined />
        </button>
        
      </section> */}
    </>
  )
}
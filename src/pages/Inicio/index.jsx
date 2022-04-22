import React from "react";
import { useControle } from "../../hooks/controle.jsx";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal } from "../../components";

import styles from "./styles.module.css";

export default function Inicio() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);

  return (
    <>
      <div className={styles.inicio}>
        <h1>Saudações enclavistas</h1>
  
        <div className={styles.containerHolocron}>
          <Holocron animado tamanho="20vmin"/>
        </div>
        
      </div>

      <Modal>
      </Modal>
    </>
  )
}
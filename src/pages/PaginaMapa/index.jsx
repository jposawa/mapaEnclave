import React from "react";
import { useControle } from "../../hooks/controle.jsx";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal, Mapa } from "../../components";

import styles from "./styles.module.css";

export default function PaginaMapa() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);

  return (
    <>
      <div className={styles.paginaMapa}>
        <h1>Saudações enclavistas</h1>

        <section className={styles.slotMapa}>
          <Mapa />
        </section>
        
      </div>

      <Modal>
      </Modal>
    </>
  )
}
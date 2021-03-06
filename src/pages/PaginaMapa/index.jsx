import React from "react";
import { useControle } from "../../hooks/controle.jsx";
import {ShareAltOutlined} from "@ant-design/icons";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal, Mapa } from "../../components";

import styles from "./styles.module.css";

export default function PaginaMapa() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);
  const [mostraAstrogador, fechaPaineis] = React.useState(true);

  return (
    <>
      <div className={styles.paginaMapa} onClick={fechaPaineis}>

        <section className={styles.slotMapa}>
          <Mapa />
        </section>
        
      </div>
    </>
  )
}
import React from "react";
import { useControle } from "../../hooks/controle.jsx";
import {ShareAltOutlined} from "@ant-design/icons";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal, Mapa } from "../../components";

import styles from "./styles.module.css";

export default function PainelMenu(props) {
  const {mostra, defineMostra, children} = props;
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);
  const [mostraAstrogador, setMostraAstrogador] = React.useState(true);

  return (
    <div className={`${styles.slotPainel} ${mostra ? "" : styles.painelFechado}`}>
      <span className={styles.fundoPainel} />
      {children}
    </div>
  )
}
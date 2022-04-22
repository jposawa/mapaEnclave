import React from "react";
import {useControle} from "../../hooks/controle";

import styles from "./styles.module.css";

export default function Modal(props) {
  const {children, proibidoFechar, mostra, corpoTransparente} = props;
  const {mostraModal, setMostraModal} = useControle();

  const _mostra = React.useMemo(() => !!(mostra ^ mostraModal), [mostraModal, mostra]);

  return(
    <div className={`${styles.modal} ${_mostra ? "" : "oculto"} ${corpoTransparente ? styles.corpoTransparente : ""}`}>
      <span className={styles.fundoModal} onClick={() => { if(!proibidoFechar) {setMostraModal(false)}}}/>

      <div className={styles.corpoModal}>
        {!proibidoFechar && 
          <button className={styles.fechaModal} onClick={() => {setMostraModal(false)}}>&times;</button>
        }
        {children}
      </div>
    </div>
  )
}
import React from "react";

import styles from "./styles.module.css";

export default function SimboloHolocron(props) {
  const {animado} = props;
  const classAnimacao = !animado ? null : animado === "total" ? styles.animacaoTotal : "externo" ? styles.animacaoExterna : styles.animacaoInterna;

  return(
    <span className={`${styles.desenhoCentral} ${classAnimacao}`}>
      <span className={styles.quadradoExternoInclinado}/>
      
      <span className={styles.quadradoInterno}>
        <span className={styles.circulo}/>
      </span>
    </span>
  );
}
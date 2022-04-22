import React from "react";

import SimboloHolocron from "../../SimboloHolocron";

import styles from "./styles.module.css";

export default function Verso(props) {
  const {className, versoAnimado} = props;

  return(
    <div className={`${styles.verso} ${className}`}>
      <span className={styles.quadradoPequeno}/>
      <span className={styles.quadradoPequeno}/>
      <span className={styles.quadradoPequeno}/>
      <span className={styles.quadradoPequeno}/>

      <SimboloHolocron animado={versoAnimado}/>
    </div>
  );
}
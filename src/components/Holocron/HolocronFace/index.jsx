import React from "react";

import styles from "./styles.module.css";

export default function HolocronFace(props) {
  return (
    <span className={`${styles.face} ${props.className}`}>
      <span className={styles.circuloMaior}>
        <span className={styles.quadrado45Maior}>
          <span className={styles.quadrado45Menor}>
            <span className={styles.circuloMenor}/>
          </span>
        </span>
      </span>
    </span>
  )
}
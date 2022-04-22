import React from "react";
import styles from "./styles.module.css";

export default function Triangulo(props) {
  const {className, tamanho, cor} = props;

  return (
    <span className={`${styles.triangulo} ${className}`} style={{
      "--tamanho":tamanho, 
      "--cor":cor,
    }}/>
  );
}
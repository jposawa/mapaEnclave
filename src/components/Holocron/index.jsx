import React from "react";

import HolocronFace from "./HolocronFace/";

import styles from "./styles.module.css";

export default function Holocron(props) {
  const {animado, animacao, tamanho} = props;
  const palavrasAnimacaoTotal = ["introdução", "apresentação", "inicio", "início"];

  const classAnimacao = !animado && !animacao ? "" : palavrasAnimacaoTotal.includes(animado) || palavrasAnimacaoTotal.includes(animacao) ? styles.animacaoIntrodutoria : styles.animacaoPadrao;

  const nomeAnimacao = "giroHorizontalInclinado";
  
  return (
    <div className={`${styles.holocron} ${classAnimacao}`} style={{"--tamanhoLado": tamanho}}>
      <span className={styles.luzInterior}/>
      <HolocronFace className={styles.frente}/>
      <HolocronFace className={styles.tras}/>
      <HolocronFace className={styles.direita}/>
      <HolocronFace className={styles.esquerda}/>
      <HolocronFace className={styles.cima}/>
      <HolocronFace className={styles.baixo}/>
    </div>
  )
}
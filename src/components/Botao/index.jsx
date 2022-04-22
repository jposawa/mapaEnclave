import React from "react";
import styles from "./styles.module.css";

export default function Triangulo(props) {
  const {
    id,
    className, 
    type, 
    children, 
    onClick, 
    largura, 
    secundaria, 
    secundario, 
    terciaria,
    terciario,
    complementar, 
    name, 
    disabled, 
    confirma
  } = props;

  const classeSecundaria = secundaria || secundario;
  const classeTerciaria = terciaria || terciario;

  const handleClick = (event) => {
    if(onClick) {
      onClick();
    }
  }

  return (
    <button
      id={id}
      name={name}
      className={`
        ${styles.botao} 
        ${className} 
        ${confirma ? styles.modoConfirma : complementar ? styles.modoComplementar : classeSecundaria ? styles.modoSecundario : classeTerciaria ? styles.modoTerciario : undefined}

      `} 
      type={type} 
      onClick={handleClick}
      style={{"--largura":largura}}

      disabled={disabled}

    >
      {children ? children : "Botão"}
    </button>
  );
}
import React from "react";
import { useControle } from "../../hooks/controle";

import styles from "./styles.module.css";

export const Campo = React.forwardRef((props, ref) => {
  const {className, type, secundaria, secundario, value, placeholder} = props;
  const { dadosJogo } = useControle();

  const classeSecundaria = secundaria || secundario;

  return (
    <>
      { dadosJogo?.iniciado ? (
        <span className={`${styles.valorCampo} ${className}`}>{value}</span>
      ) : (
        <input 
          className={`${styles.campo} ${className} ${classeSecundaria ? styles.modoSecundario : ""}`} 
          type={type}
          defaultValue={value} 
          placeholder={placeholder}
          ref={ref}
        />
      )}
    </>
  );
});
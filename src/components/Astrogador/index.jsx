import React from "react";
import {useControle} from "../../hooks";

import styles from "./styles.module.css";

export default function Astrogador(props) {
  const {setMostraModal} = useControle();

  
  return (
    <>
      <datalist id="listaPlanetas">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>

      <div className={styles.slotCalculo}>
          <form className={styles.formCalculo} onSubmit={calcularDestino}>
            <p>
              <input type="text" placeholder="Origem" list="listaPlanetas" ref={refOrigem}/>
            </p>
  
            <p>
              <input type="text" placeholder="Destino" list="listaPlanetas" ref={refDestino}/>
            </p>

            <p>
              <input type="tel" placeholder="Classe propulsor" ref={refPropulsor} defaultValue="1"/>
            </p>
  
            <p>
              <Botao type="submit">Calcular</Botao>
            </p>
          </form>
          
          {distancia && tempo && 
          <div className={styles.resultados}>
            <p>{distancia.toFixed(2)}pc</p>
            <p>{tempo.toFixed(2)} horas</p>
          </div>
          }
        </div>
    </>
  )
}
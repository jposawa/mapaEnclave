import React from "react";

import Triangulo from "../Triangulo";
import Verso from "./Verso";

import styles from "./styles.module.css";

export default function Carta(props) {
  const {
    name,
    animado,
    positiva,
    negativa, 
    valor,
    dinamica,
    mista,
    mutavel,
    altura,
    virada,
    viraMouseOver,
    viraClique,
    cliqueAlterna,
    onClick,
    versoAnimado,
  } = props;
  const _mutavel = mutavel || dinamica || mista;
  const sinais = [];
  const _valor = valor ? valor : 1;
  const corPrimaria = positiva || _mutavel ? "#36b" : negativa ? "#e10" : "#192";
  const corSecundaria = _mutavel ? "#e10" : undefined;
  const [grauOver, setGrauOver] = React.useState();
  const cartaRef = React.useRef();

  React.useEffect(() => {
    setGrauOver(virada && viraMouseOver ? "0deg" : "180deg");
    cartaRef.current.classList.add(styles.viravel);
  }, [])

  const aplicaClique = () => {
    if (virada && viraClique) {
      let valorGrau;
      
      if(cliqueAlterna) {
        valorGrau = (parseInt(grauOver) + 180) % 360;
        cartaRef.current.classList.toggle(styles.virada);
      }
      else {
        valorGrau = 0
        cartaRef.current.classList.remove(styles.virada);
      }
      
      setGrauOver(`${valorGrau}deg`);
    }

    if(onClick) {
      onClick();
    }
  }

  sinais.push(_mutavel ? "±" : positiva ? "+" : negativa ? "-" : "");

  if(_mutavel) {
    sinais.push("+", "-");
  }
  
  return (
    <div name={name} ref={cartaRef} onClick={aplicaClique} className={`${styles.containerCarta} ${virada ? styles.virada : ""}`} style={{
      "--altura":altura,
      "--fundoPrimario":corPrimaria,
      "--fundoSecundario":corSecundaria,
      "--grauViraOver":grauOver,
      cursor: viraClique ? "pointer" : "default",
    }}>
      <div className={styles.conteudo}>
        <div className={styles.carta}>
          <div className={styles.containerPrincipal}>
            <div className={styles.blocoPrincipal}>
              <span className={styles.fundoPrimario}/>
              <span className={styles.fundoSecundario}/>
              <span className={styles.sinalCarta}>{sinais.length === 1 && sinais[0]}</span>
              <div className={styles.faixaValor}>
                <Triangulo/>
                <p className={styles.valorCentral}>
                  {`${sinais[0]}${_valor}`}
                </p>
                <Triangulo/>
              </div>
            </div>
          </div>
    
          <div className={styles.blocoInferior}>
            <span className={styles.fundoPrimario}>{sinais.length === 3 && sinais[1]}</span>
            <span className={styles.fundoSecundario}>{sinais.length === 3 && sinais[2]}</span>
          </div>
        </div>
      </div>

      <Verso versoAnimado = {versoAnimado}/>
    </div>
  )
}
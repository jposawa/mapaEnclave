import React from "react";
import styles from "./styles.module.css";

export default function Carregando(props) {
  const {className, tamanho, cor, tempo, label, children, setMostraBotao} = props;
  const [tempoAtual, setTempoAtual] = React.useState();
  const texto = children ? children : label ? label : undefined;

  React.useEffect(() => {
    setTempoAtual(tempo);
    setMostraBotao(false);
  }, [])

  React.useMemo(() => {
    let _tempoAtual = tempoAtual;
    
    if(_tempoAtual && _tempoAtual >= 0) {
      setTimeout(() => {
        _tempoAtual -= 1;

        setTempoAtual(_tempoAtual);
        setMostraBotao(_tempoAtual === 0);
      }, 1000);
    }
  },[tempoAtual])

  return (
    <div className={`${styles.carregando} ${className}`} style={{"--tamanho": tamanho}}>
      <span 
        className={`${tempo ? styles.temporizador : styles.circLoading}`} 
        style={{
          "--tempoFechar": tempo,
          "--tempoAtual": tempoAtual,
        }}
      >
        {tempoAtual}
      </span>
      {texto && <p>{texto}</p>}
    </div>
  );
}
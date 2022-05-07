import React from "react";
import {useControle} from "../../hooks";
import {Botao} from "../";

import styles from "./styles.module.css";

export default function Astrogador(props) {
  const {setMostraModal, planetas, setPlanetasRota} = useControle();
  const refOrigem = React.useRef();
  const refDestino = React.useRef();
  const refPropulsor = React.useRef();
  const [distancia, setDistancia] = React.useState();
  const [tempo, setTempo] = React.useState();
  const [horasTotais, setHorasTotais] = React.useState();
  const velocidadePadrao = 12.22375; //Isso seria quantos parsecs por hora em um hyperdrive class 1
  const parsecPonto = 21;

  const formataTempo = (tempoBruto) => {
    const horasTotais = Math.floor(tempoBruto);
    const dias = Math.floor(horasTotais / 24);
    let horas = horasTotais % 24;
    let minutos = Math.floor((tempoBruto - horasTotais) * 60);

    horas = horas > 10 ? horas : `0${horas}`;
    minutos = minutos > 10 ? minutos : `0${minutos}`;

    setTempo(`${dias}d ${horas}:${minutos}`);
    setHorasTotais(tempoBruto.toFixed(2));
  }

  const calcularDestino = (evento) => {
    evento.preventDefault();
    const nomeOrigem = refOrigem.current.value;
    const nomeDestino = refDestino.current.value;
    const classePropulsor = parseFloat(refPropulsor.current.value);

    const [origem] = planetas.filter((p) => (p.Name === nomeOrigem));
    const [destino] = planetas.filter((p) => (p.Name === nomeDestino));

    const resultado = Math.hypot(destino.X - origem.X, destino.Y - origem.Y);
    const distanciaPc = resultado * parsecPonto;
    const tempoBruto = (distanciaPc/velocidadePadrao) * classePropulsor;

    setPlanetasRota([origem, destino]);
    setDistancia(distanciaPc);
    formataTempo(tempoBruto);
  }

  const limpaRota = () => {
    setDistancia();
    setTempo();
    setPlanetasRota([]);
  }

  /*
    <datalist id="listaPlanetas">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>
  */
  
  return (
    <>
      <datalist id="listaPlanetasAst">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>
      <div className={styles.slotCalculo}>
          <form className={styles.formCalculo} onSubmit={calcularDestino}>
            <p>
              <span>Origem: </span>
              <input id="campoOrigem" type="text" placeholder="Sistema origem" list="listaPlanetasAst" ref={refOrigem} required/>
            </p>
  
            <p>
              <span>Destino: </span>
              <input id="campoDestino" type="text" placeholder="Sistema destino" list="listaPlanetasAst" ref={refDestino} required/>
            </p>

            <p>
              <span>Classe Hipermotor: </span>
              <input
                id="campoPropulsor"
                className={`${styles.inputPequeno} ${styles.txtCentralizado}`}
                type="tel"
                placeholder="Classe propulsor"
                ref={refPropulsor}
                defaultValue="1"
              />
            </p>
  
            <p className={styles.slotBotoes}>
              <Botao complementar type="reset" onClick={limpaRota}>Limpar</Botao>
              <Botao secundario type="submit">Calcular</Botao>
            </p>
          </form>
          
          {distancia && tempo && 
          <div className={styles.resultados}>
            <p>{distancia.toFixed(2)}pc</p>
            <p>~ {tempo}</p>
            <p>({horasTotais} horas)</p>
          </div>
          }
        </div>
    </>
  )
}
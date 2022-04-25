/*
  Coordenadas de https://docs.google.com/spreadsheets/d/19zafALbE-mchYDKZgkJR-kmxrt2_KY57FS7tzkQSMEE/htmlview
  São 15x os valores das coordenadas de http://www.swgalaxymap.com/

  No SWGalaxyMap cada lado do grid tem 1500 parsecs (pc) e cada lado mede 100 unidades do plano cartesiano dele.

  Em meu mapa to pegando as coordenadas e dividindo por 16 o que coloca cada lado do "grid" como 6,25 pontos

  Portanto cada lado passa a medir 6,25 pontos e 1 ponto passa a ser 240pc

*/

import React from "react";
import { useControle } from "../../hooks/controle.jsx";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal, Mapa } from "../../components";

import styles from "./styles.module.css";

export default function Astrogacao() {
  const {planetas} = useControle();
  const refOrigem = React.useRef();
  const refDestino = React.useRef();
  const refPropulsor = React.useRef();
  const [distancia, setDistancia] = React.useState();
  const [tempo, setTempo] = React.useState();
  const velocidadePadrao = 12.22375; //Isso seria quantos parsecs por hora em um hyperdrive class 1
  const parsecPonto = 21;

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

    setDistancia(distanciaPc);
    setTempo(tempoBruto);
  }

  return (
    <>
      <datalist id="listaPlanetas">
        {planetas && planetas.map((p) => (
          p.Name && <option key={`${p.technicalId}|${p.Name}`} value={p.Name}/>
        ))}
      </datalist>
      
      <div className={styles.inicio}>
        <h1>Painel de Astrogação</h1>
        <p>Preencha formulário abaixo para estimativa de distância e tempo de viagem.</p>

        <div className={styles.slotCalculo}>
          <form className={styles.formCalculo} onSubmit={calcularDestino}>
            <p>
              Origem
              <input type="text" placeholder="Origem" list="listaPlanetas" ref={refOrigem}/>
            </p>
            
            <p>
              Destino
              <input type="text" placeholder="Destino" list="listaPlanetas" ref={refDestino}/>
            </p>
            
            <p>
              Classe hiperpropulsor
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
      </div>

      <Modal>
      </Modal>
    </>
  )
}
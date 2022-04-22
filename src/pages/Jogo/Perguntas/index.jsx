import React from "react";
import { useControle } from "../../../hooks/controle.jsx";
import {Botao, Modal} from "../../../components";

import styles from "./styles.module.css";

export default function Perguntas() {
  const { 
    configJogo, 
    dadosJogo, 
    formataTextoPontos, 
    ajustaNomeDificuldade, 
    verificaRespostaPontos,
    mostraProximo,
    setMostraProximo,
    proximaFase,
    setMostraModal,
    proximaEtapa,
    alternativasDescartadas,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();

  const alteraResposta = (respostaInformada) => {
    if(!mostraProximo){
      setResposta(respostaInformada !== resposta ? respostaInformada : undefined);
    }
  }

  const resetaAlternativas = () => {
    const [elementoSlotAlternativas] = document.getElementsByClassName(styles.slotAlternativas);
    setResposta();

    Object.values(elementoSlotAlternativas.children).forEach((elementoAlternativa) => {
      elementoAlternativa.classList.remove(styles.alternativaCorreta);
      elementoAlternativa.classList.remove(styles.descartada);
      elementoAlternativa.disabled = false;
    })
  }

  const chamaProxima = (responderPerguntaFinal) => {
    resetaAlternativas();

    if(!responderPerguntaFinal && dadosJogo.andamento.faseAtual === configJogo.fluxo.perguntas.totalFases - 1) {
      setMostraModal(true);
    }
    else {
      proximaFase();
    }
  }

  const escolhaPerguntaFinal = (responder) => {
    setMostraModal(false);
    if(responder) {
      chamaProxima(true);
    }
    else {
      proximaEtapa();
    }
  }

  React.useMemo(()=>{
    const listaAlternativas = Object.values(document.getElementsByClassName(styles.alternativa));
    
    if(alternativasDescartadas === 0) {
      listaAlternativas.forEach((alt) => {
        alt.classList.remove(styles.descartada);
        alt.disabled = false;
      });
    }
    else {
      const alternativasErradas = listaAlternativas.filter((alt) => (
        !perguntaAtual.opcoes[alt.name].correta
      ));

      const alternativasDesativadas = alternativasErradas.filter((alt) => (
        alt.disabled
      ));

      if(alternativasDesativadas.length === 0) {
        for(let i = 0; i < 3 - alternativasDescartadas; i++){
          const _indice = Math.floor((Math.random() * alternativasErradas.length));
  
          alternativasErradas.splice(_indice, 1);
        }
  
        alternativasErradas.forEach((alt) => {
          alt.classList.add(styles.descartada);
          alt.disabled = true;
        })
      }
    }
  },[alternativasDescartadas]);
  
  return (
    <div className={styles.perguntas}>
      {dadosJogo && (
      <>
        <header>
          <h2>
            Pergunta {faseAtual} - {ajustaNomeDificuldade(perguntaAtual?.dificuldade)}
          </h2>
          
          <h3>[{configJogo?.pontos?.perguntas[perguntaAtual?.dificuldade]}]</h3>
        </header>
        
        <section className={styles.corpoPergunta}>
          <div className={styles.enunciado}>
            {perguntaAtual.enunciado}
          </div>
          
          <div className={styles.slotAlternativas}>
            {Object.entries(perguntaAtual.opcoes).map(([letra, opcao]) => (
              <Botao
                key={letra}
                name={letra}
                terciario={letra === resposta}
                className={`${styles.alternativa} ${letra === resposta ? styles.respostaAtiva : undefined}`}
                onClick={() => {alteraResposta(letra)}}
              >
                {letra.toUpperCase()}: {opcao.texto}
              </Botao>
            ))}
          </div>
        </section>
        
        <section className={styles.slotBotoes}>
          <Botao
            className={`${styles.btnConfirma} ${resposta && !mostraProximo ? undefined : "oculto"}`}
            largura="7rem"
            secundaria
            onClick={() => {verificaRespostaPontos(resposta, styles)}}
          >
            CONFIRMAR
          </Botao>
          <Botao
            className={mostraProximo ? undefined : "oculto"}
            largura="7rem"
            onClick={chamaProxima}
          >
            PRÓXIMA
          </Botao>
        </section>
      </>
      )}
      
      <Modal proibidoFechar>
        <h2>Atenção!</h2>
        <p>A próxima é sua <b>pergunta final</b>, no valor de {configJogo?.pontos?.perguntas?.final} pontos!</p>
        <br/>
        <p>Você deseja tentar responder?</p>
        <br/>
        <div className={styles.slotBotoesModal}>
          <Botao complementar onClick={() => {escolhaPerguntaFinal()}}>Não</Botao>
          <Botao onClick={() => {escolhaPerguntaFinal(true)}}>Sim</Botao>
        </div>
      </Modal>
    </div>
  )
}
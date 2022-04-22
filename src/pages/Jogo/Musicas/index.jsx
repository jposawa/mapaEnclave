import React from "react";
import { useControle, useMusica } from "../../../hooks";
import {Botao, Modal} from "../../../components";
import {CaretRightOutlined, PauseOutlined} from "@ant-design/icons";

import styles from "./styles.module.css";

export default function Musicas() {
  const { 
    configJogo, 
    dadosJogo,
    copiaDadosJogo, 
    setMostraModal,
    mostraModal,
    atualizaPontos,
    idProximoJogador,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();
  const [musicaAtiva, setMusicaAtiva] = React.useState();
  const {tocando, alterna, para, carregou, audioPronto} = useMusica(musicaAtiva?.url);

  const ativaMusica = (musica) => {
    setMusicaAtiva(musica);
    setMostraModal(!!musica);
  }

  const respondeMusica = (acertou) => {
    const _musicaAtiva = {...musicaAtiva};
    const _dadosJogo = copiaDadosJogo();
    const { jogadorAtual } = _dadosJogo.andamento;
    let modPonto = configJogo?.pontos.musicas.padrao;
    
    _dadosJogo.musicas[musicaAtiva.numero].tocada = true;

    if(!acertou) {
      modPonto *= configJogo?.pontos.musicas.proporcaoPerda;
    }

    const musicasRestantes = _dadosJogo.musicas.filter((mus) => {
      return (mus && !mus.tocada);
    });

    _dadosJogo.finalizando = musicasRestantes.length === 0;
    // _dadosJogo.andamento.jogadorAtual = idProximoJogador(jogadorAtual);

    setMostraModal(false);
    atualizaPontos(modPonto, _dadosJogo);
  }

  React.useMemo(() => {
    if(!mostraModal && musicaAtiva && tocando) {
      alterna();
    }
  }, [mostraModal]);

  return(
    <div className={styles.musicas}>
      {dadosJogo && (
      <>
        {Object.entries(dadosJogo?.musicas).map(([numero, musica]) => (
          musica && 
            <Botao
              key={numero}
              name={numero}
              onClick={() => {ativaMusica({...musica, numero: numero})}}
              disabled={musica?.tocada}
            >
              Música {numero}
            </Botao>
        ))}
      </>
    )}

      <Modal>
        <h2>Música {musicaAtiva?.numero}</h2>
        {!carregou ? <>
          <br/>
          <h3>Nenhuma música carregada</h3>
        </> : <>
          <div className={styles.player}>
            {!audioPronto ? <p>Carregando música</p> : 
            <>
              <Botao secundaria onClick={para}>&#9632;</Botao>
              <Botao onClick={alterna}>
                {!tocando ? <CaretRightOutlined/> : <PauseOutlined />}
              </Botao>
            </>}
          </div>
          <br/>
          <div className={styles.slotBotoesModal}>
            <Botao complementar onClick={() => {respondeMusica()}}>Errou</Botao>
            <Botao confirma onClick={() => {respondeMusica(true)}}>Acertou</Botao>
          </div>
        </>}
      </Modal>
    </div>
  )
}
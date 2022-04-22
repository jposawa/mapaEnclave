import React from "react";
import {Navigate} from 'react-router-dom';
import { MessageOutlined, IdcardOutlined, WindowsOutlined } from "@ant-design/icons";
import { useControle } from "../../hooks/controle.jsx";
import { Botao, Ajuda } from "../../components";
import Perguntas from "./Perguntas";
import Musicas from "./Musicas";

import styles from "./styles.module.css";

export default function Jogo() {
  const { dadosJogo, formataTextoPontos, ajudaAtiva, setAjudaAtiva } = useControle();
  const { jogadorAtual, etapaAtual } = {jogadorAtual: dadosJogo?.andamento?.jogadorAtual, etapaAtual: dadosJogo?.andamento?.etapaAtual};
  const dadosJogadorAtual = dadosJogo?.jogadores[jogadorAtual];

  return (
    <div className={styles.jogo}>
      {!dadosJogo ? <h1>Carregando jogo...</h1> : dadosJogo.finalizando ? <Navigate replace to="/placar"/> : (
      <>
        <header>
          <div className={styles.blocoJogador1}>
            {etapaAtual === "perguntas" ? 
            <>
              <h2>{dadosJogadorAtual?.nome}</h2>
              <h3>{formataTextoPontos(dadosJogadorAtual?.pontos)}</h3>
            </>
            : 
              <>
                {jogadorAtual === "jogador1" ?
                  <h2 className={styles.jogadorAtivo}>[{dadosJogo?.jogadores?.jogador1?.nome}]</h2>
                : 
                  <h2>{dadosJogo?.jogadores?.jogador1?.nome}</h2>
                }
                <h3>{formataTextoPontos(dadosJogo?.jogadores?.jogador1?.pontos)}</h3>
              </>
            }
          </div>

          <div className={styles.blocoJogador2}>
            {etapaAtual === "perguntas" ? 
            <div className={styles.slotAjudas}>
              <Botao
                secundario={dadosJogadorAtual?.ajudas?.chat > 0}
                disabled={dadosJogadorAtual?.ajudas?.chat <= 0}
                onClick={()=>{setAjudaAtiva("chat")}}
              >
                <MessageOutlined />
                <span className={styles.labelAjuda}>Chat</span>
                {dadosJogadorAtual?.ajudas?.chat > 1 && <span className={styles.qtdAjuda}>{dadosJogadorAtual?.ajudas?.chat}</span>}
              </Botao>

              <Botao
                secundario={dadosJogadorAtual?.ajudas?.universitarios > 0} 
                disabled={dadosJogadorAtual?.ajudas?.universitarios === 0}
                onClick={()=>{setAjudaAtiva("universitarios")}}
              >
                <IdcardOutlined />
                <span className={styles.labelAjuda}>Convidados</span>
                {dadosJogadorAtual?.ajudas?.universitarios > 1 && <span className={styles.qtdAjuda}>{dadosJogadorAtual?.ajudas?.universitarios}</span>}
              </Botao>

              <Botao 
                secundario={dadosJogadorAtual?.ajudas?.cartas > 0} 
                disabled={dadosJogadorAtual?.ajudas?.cartas === 0}
                onClick={()=>{setAjudaAtiva("cartas")}}
              >
                <WindowsOutlined />
                <span className={styles.labelAjuda}>Cartas</span>
                {dadosJogadorAtual?.ajudas?.cartas > 1 && <span className={styles.qtdAjuda}>{dadosJogadorAtual?.ajudas?.cartas}</span>}
              </Botao>
            </div>
            : 
              <>
                {jogadorAtual === "jogador2" ?
                  <h2 className={styles.jogadorAtivo}>[{dadosJogo?.jogadores?.jogador2?.nome}]</h2>
                : 
                  <h2>{dadosJogo?.jogadores?.jogador2?.nome}</h2>
                }
                <h3>{formataTextoPontos(dadosJogo?.jogadores?.jogador2?.pontos)}</h3>
              </>
            }
          </div>
        </header>
        
        <section className={styles.slotEtapa}>
        {
          {
            "perguntas": <Perguntas/>,
            "musicas": <Musicas/>
          }[etapaAtual]
        }
        </section>

        <Ajuda mostra={ajudaAtiva && ajudaAtiva !== ""} tipo = {ajudaAtiva}/>
      </>
    )}
    </div>
  )
}
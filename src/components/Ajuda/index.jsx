import React from "react";
import {Modal, Holocron, Botao, Carregando, Carta} from "../";
import {useControle} from "../../hooks/";

import { MessageOutlined, IdcardOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

export default function Ajuda(props) {
  const {children, mostra, tipo} = props;
  const {
    fechaAjuda, 
    cartas, 
    setAlternativasDescartadas, 
    recuperaAjuda,
    ajudaAtiva,
  } = useControle();
  const [mostraBotao, setMostraBotao] = React.useState(false);
  const [cartasAjuda, setCartasAjuda] = React.useState();
  const [mostraRecuperaAjuda, setMostraRecuperaAjuda] = React.useState(false);

  React.useMemo(()=>{
    if(ajudaAtiva === "cartas") {
      const _cartas = Object.values(cartas);
      const _cartasAjuda = [];
  
      while(_cartasAjuda.length < 4) {
        const idCarta = Math.floor((Math.random() * _cartas.length));
        const carta = _cartas[idCarta];
  
        carta.id = carta.mista ? carta.valor+1 : carta.valor;
  
        _cartasAjuda.push(carta);
        
        _cartas.splice(idCarta, 1);
      }
      setAlternativasDescartadas(0);
      setCartasAjuda(_cartasAjuda);
    }
  },[ajudaAtiva]);

  const chamaRecuperaAjuda = (nomeAjuda) =>{
    setMostraRecuperaAjuda();
    fechaAjuda();
    recuperaAjuda(nomeAjuda);
  }

  const escolheCarta = (carta) => {
    const cartasDescartadas = cartasAjuda.filter((c) => (c.id !== carta.id));
    const [slotCartasDOM] = document.getElementsByClassName(styles.ajudaCartas);

    cartasDescartadas.forEach((c) => {
      const [cartaDOM] = document.getElementsByName(`carta${c.id}`);

      cartaDOM.style.opacity = 0;
      
      setTimeout(() => {
        slotCartasDOM.style.gap = 0;
        cartaDOM.classList.add(styles.cartaFechada);
      }, 500);
    });

    setAlternativasDescartadas(carta.valor);

    if(carta.mista) {
      setMostraRecuperaAjuda(true);
    }
    else {
      setTimeout(() => {
        fechaAjuda();
      }, 5000);
    }
  }

  return(
    <>
      {mostra && 
        <Modal mostra={mostra} proibidoFechar corpoTransparente={tipo === "cartas"}>
          {
            {
              "universitarios": 
                <>
                  <div className={styles.containerHolocron}>
                    <Holocron tamanho="10vmin"/>
                  </div>
                  <br/><br/>
                  <h3>Consultando convidados</h3>
                  <Botao onClick={()=>{fechaAjuda()}}>Responder</Botao>
                </>,
              "chat": 
                <div className={styles.ajudaChat}>
                  <div className={styles.slotCarregando}>
                    <Carregando tempo={15} setMostraBotao={setMostraBotao}/>
                  </div>
                  
                  {mostraBotao ? <Botao onClick={()=>{fechaAjuda()}}>Responder</Botao> : <p>Aguardando chat</p>}
                </div>,
              "cartas": 
                <div className={styles.ajudaCartas}>
                  <div className={styles.slotCartas}>
                    {cartasAjuda && cartasAjuda.map((carta) => (
                      <Carta
                        key={carta.id}
                        name={`carta${carta.id}`}
                        altura="max(7rem,20vmin)"
                        virada
                        viraClique
                        mista={carta.mista}
                        negativa={carta.negativa}
                        valor={carta.valor}
                        onClick={() => {escolheCarta(carta)}}
                      />
                    ))}
                  </div>
                  
                  <div className={`${styles.slotRecuperaAjuda} ${mostraRecuperaAjuda ? "" : "oculto"}`}>
                    <h3>Escolha tipo de ajuda extra</h3>
                    
                    <div>
                      <Botao
                        secundario
                        onClick={()=>{chamaRecuperaAjuda("universitarios")}}
                      >
                        <IdcardOutlined />
                        <span className={styles.labelAjuda}>Convidados</span>
                      </Botao>
      
                      <Botao
                        secundario
                        onClick={()=>{chamaRecuperaAjuda("chat")}}
                      >
                        <MessageOutlined />
                        <span className={styles.labelAjuda}>Chat</span>
                      </Botao>
                    </div>
                  </div>
                </div>,
            }[tipo]
          }
        </Modal>
      }
    </>
  )
}
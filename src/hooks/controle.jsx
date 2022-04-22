import React from 'react';
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";


export const ControleContext = React.createContext();

export const ControleProvider = ({children}) => {
  const CONFIG = {
    PREFIXO_LS: "mapaEnclave@",
    BASE_FB: "enclave/mapa",
    FB_CONFIG: {
      apiKey: "AIzaSyAxJiwtCxBETHSUPjXogKhWMgauXQIi_uw",
      authDomain: "jposawa-162817.firebaseapp.com",
      databaseURL: "https://jposawa-162817-default-rtdb.firebaseio.com",
      projectId: "jposawa-162817",
      storageBucket: "jposawa-162817.appspot.com",
      messagingSenderId: "421124702668",
      appId: "1:421124702668:web:0b682cbd429f65c64e9d69",
      measurementId: "G-THVV1R47B1"
    },
  };
  const [fbApp, setFbApp] = React.useState();
  const [mostraModal, setMostraModal] = React.useState(false);
  const [planetas, setPlanetas] = React.useState();

  const pegaDadosLS = (tabela) => {}

  const pegarDados = (tabela) => {
    const caminho = tabela ? `${CONFIG.BASE_FB}/${tabela}` : CONFIG.BASE_FB;
    const db = getDatabase();
    const refResposta = ref(db, caminho);

    return refResposta;
  }

  const pegarPlanetas = () => {
    const refMapa = pegarDados();

    onValue(refMapa, (recorte) => {
      setPlanetas(recorte.val());
    })
  }

  React.useEffect(()=>{
    setFbApp(initializeApp(CONFIG.FB_CONFIG));
    pegarPlanetas();
  },[]);

  const valoresExportados = {
    mostraModal,
    setMostraModal,
    planetas,
    CONFIG,
  };

  return (
    <ControleContext.Provider value={valoresExportados}>
      {children}
    </ControleContext.Provider>
  );
}


export const useControle = () =>{
  const conteudo = React.useContext(ControleContext);

  if(!conteudo){
    console.error("Tem que estar dentro de um Provider");
  }

  return conteudo;
}
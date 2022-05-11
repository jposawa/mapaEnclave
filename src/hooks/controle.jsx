/*
  Coordenadas de https://docs.google.com/spreadsheets/d/19zafALbE-mchYDKZgkJR-kmxrt2_KY57FS7tzkQSMEE/htmlview
  São 15x os valores das coordenadas de http://www.swgalaxymap.com/

  No SWGalaxyMap cada lado do grid tem 1500 parsecs (pc) e cada lado mede 100 unidades do plano cartesiano dele.

  Em meu mapa to pegando as coordenadas e dividindo por 14 o que coloca cada lado do "grid" como 6,25 pontos

  Portanto cada lado passa a medir 6,25 pontos e 1 ponto passa a ser 240pc

*/

import React from 'react';
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
  const [planetasGeoJson, setPlanetasGeoJson] = React.useState();
  const [camadaPlanetas, setCamadaPlanetas] = React.useState();
  const velocidadePadrao = 12.22375; //Isso seria quantos parsecs por hora em um hyperdrive class 1
  const margemMapa = 0.5; //Essa margem é calculada para compensar a mudança de escala
  const parsecPonto = 1.5 * margemMapa;
  const [mostraAstrogacao, setMostraAstrogacao] = React.useState(false);
  const [mostraBusca, setMostraBusca] = React.useState(false);
  const [navPlanetas, setNavPlanetas] = React.useState([]);
  const [classeMotor, setClasseMotor] = React.useState(1);
  const [planetaBuscado, setPlanetaBuscado] = React.useState();
  const [planetasRota, setPlanetasRota] = React.useState([]);

  const pegarDados = (tabela) => {
    const caminho = tabela ? `${CONFIG.BASE_FB}/${tabela}` : CONFIG.BASE_FB;
    const db = getDatabase();
    const refResposta = ref(db, caminho);

    return refResposta;
  }

  const formataPlanetas = (objBruto) => {
    const dadosPlanetas = {
      type: "FeatureCollection",
    }
    let contador = 0;

    dadosPlanetas.features = objBruto.map((p) => ({
      id: contador++,
      type: "Feature",
      properties: p,
      geometry: {
        type: "Point",
        coordinates: [p.X, p.Y],
      },
    }));

    setPlanetasGeoJson(dadosPlanetas);
  }

  const ajustaPlanetas = (objBruto) => {
    //Isso é feito porque os dados que obtive na Internet são 15x os valores que estou usando como referência pros cálculos. Portanto faço isso pra ajustar
    const offset = 15 * margemMapa;
    const planetasAjustados = objBruto.map((p) => ({...p, X: p.X/offset, Y: p.Y/offset}));

    setPlanetas(planetasAjustados);
    formataPlanetas(planetasAjustados);
  }

  const pegarPlanetas = () => {
    const refMapa = pegarDados();

    onValue(refMapa, (recorte) => {
      // setPlanetas(recorte.val());
      ajustaPlanetas(recorte.val());
      // formataPlanetas(recorte.val());
    })
  }

  const buscaPlaneta = (nomeBuscado) => {
    if(!nomeBuscado || nomeBuscado.trim() === ""){
      return;
    }
    
    if(!camadaPlanetas) {
      console.error("Sem base de dados planetário");
      return;
    }

    const camadaPlanetaBuscado = Object.values(camadaPlanetas._layers).find((cp) => (cp.options.name === nomeBuscado));

    if (!camadaPlanetaBuscado || camadaPlanetaBuscado.length === 0) {
      console.warn("Achamo não");
      return;
    }
   
    setPlanetaBuscado(camadaPlanetaBuscado);
  }

  const calculaViagem = () => {
    console.log("Calculando viagem");
  }

  const fechaPaineis = () => {
    setMostraAstrogador(false);
    setMostraBusca(false);
  }

  const pegaPlanetaMapa = (nomePlaneta) => {
    // console.log(nomePlaneta);
    // console.log(camadaPlanetas);
    if(camadaPlanetas) {
      const [planetaMapa] = Object.values(camadaPlanetas._layers).filter((p) => (p.options.name === nomePlaneta));

      // console.log(planetaMapa);
      return planetaMapa;
    }
  }

  const removerDuplicidadeDOM = (arrayDOM) => {
    if(arrayDOM && arrayDOM.length > 1) {
      for(let i = arrayDOM.length - 1; i > 0; i--) {
        arrayDOM[i].remove();
      }
    }
  }

  React.useEffect(()=>{
    setFbApp(initializeApp(CONFIG.FB_CONFIG));
    pegarPlanetas();
  },[]);

  const valoresExportados = {
    mostraModal,
    setMostraModal,
    planetas,
    planetasGeoJson,
    camadaPlanetas,
    setCamadaPlanetas,
    classeMotor,
    setClasseMotor,
    navPlanetas,
    setNavPlanetas,
    mostraAstrogacao,
    setMostraAstrogacao,
    velocidadePadrao,
    parsecPonto,
    mostraBusca,
    setMostraBusca,
    buscaPlaneta,
    fechaPaineis,
    planetaBuscado,
    setPlanetaBuscado,
    setPlanetasRota,
    planetasRota,
    pegaPlanetaMapa,
    removerDuplicidadeDOM,
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
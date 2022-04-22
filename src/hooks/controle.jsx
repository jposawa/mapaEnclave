import React from 'react';
import { useNavigate } from "react-router-dom";


export const ControleContext = React.createContext();

export const ControleProvider = ({children}) => {
  const CONFIG = {
    PREFIXO_LS: "mapaEnclave@",
  };
  const [mostraModal, setMostraModal] = React.useState(false);

  const pegaDadosLS = (tabela) => {}

  const valoresExportados = {
    mostraModal,
    setMostraModal,
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
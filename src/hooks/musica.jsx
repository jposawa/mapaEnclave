import React from "react";

export const useMusica = (url) => {
  const [audio, setAudio] = React.useState(new Audio());
  const [tocando, setTocando] = React.useState(false);
  const [carregou, setCarregou] = React.useState(false);
  const [audioPronto, setAudioPronto] = React.useState(false);
  const [readyCode, setReadyCode] = React.useState(0);

  const alterna = () => {setTocando(!tocando)};
  const para = () => {
    audio.load()
    setTocando(false);
  };

  const recuperaIdMusicaDrive = (urlCompartilhada) => {
    if(!urlCompartilhada) {
      return null;
    }
    
    try {
      const pedacos = urlCompartilhada?.split("/d/");
      const [idMusica] = pedacos[1]?.split("/");
  
      return idMusica;
    }
    catch(error) {
      console.error("Deu ruim na URL da música");
      console.log(error);

      return false;
    }
  }

  const geraUrlUtilizavel = (url) => {
    const idMusica = recuperaIdMusicaDrive(url);

    return idMusica ? `https://drive.google.com/uc?export=download&id=${idMusica}` : null;
  }

  React.useMemo(() => {
    const urlUtilizavel = geraUrlUtilizavel(url);
    const _audio = new Audio(urlUtilizavel);
    _audio.preload = "auto";

    setAudio(_audio);
    setCarregou(!!urlUtilizavel);
  }, [url]);

  React.useMemo(() => {
    tocando ? audio.play() : audio.pause();
  }, [tocando]);

  React.useMemo(() => {
    if(carregou && audio?.readyState === 0) {
      audio.load();
    }
  }, [audio])

  React.useMemo(() => {
    if(audio) {
      audio.addEventListener('ended', () => setTocando(false));
      audio.addEventListener('loadeddata', () => {

        if(audio.readyState >= 2){
          setAudioPronto(true);
        }
      });
  
      return () => {
        audio.addEventListener('ended', () => setTocando(false));
        audio.addEventListener('loadeddata', () => {
  
          if(audio.readyState >= 2){
            setAudioPronto(true);
          }
        });
      }
    }
  }, [audio]);

  return {
    tocando,
    alterna,
    para,
    carregou,
    audioPronto,
  };
}
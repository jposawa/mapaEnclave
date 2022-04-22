/*
  Coordenadas de https://docs.google.com/spreadsheets/d/19zafALbE-mchYDKZgkJR-kmxrt2_KY57FS7tzkQSMEE/htmlview
  São 15x os valores das coordenadas de http://www.swgalaxymap.com/

  No SWGalaxyMap cada lado do grid tem 1500 parsecs (pc) e cada lado mede 100 unidades do plano cartesiano dele.

  Em meu mapa to pegando as coordenadas e dividindo por 16 o que coloca cada lado do "grid" como 6,25 pontos

  Portanto cada lado passa a medir 6,25 pontos e 1 ponto passa a ser 240pc

*/


import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON, FeatureGroup, CircleMarker, Tooltip } from 'react-leaflet';
import {useControle} from "../../hooks";

import styles from "./styles.module.css";

export default function Mapa(props) {
  const {className, tamanho, cor} = props;
  const {planetas, planetasGeoJson} = useControle();
  const [marcadorTeste, setMarcadorTeste] = React.useState();
  const mapRef = React.useRef();

  React.useMemo(() => {
    // const { leafletElement: mapa } = mapRef?.current;
    // console.log(mapa);
    if(mapRef.current){
      const mapa = mapRef.current;
      
      if(planetasGeoJson) {
        
        const camadaPlanetas = L.geoJson(planetasGeoJson, {
          pointToLayer: (p, latlng) => {
            const marcador = L.circleMarker(latlng, {
              radius: 4,
              tooltip: p.properties.Name
            });
            marcador.bindPopup(p.properties.Name ? p.properties.Name : "Sistema desconhecido");

            if(p.properties.Name) {
              marcador.bindTooltip(p.properties.Name, {
                permanent: false,
                direction: "bottom",
                className: styles.etiquetaPlaneta,
              })
            }
            
            return marcador;
          }
        });
  
        camadaPlanetas.addTo(mapa);
      }
    }
  },[planetasGeoJson, mapRef])

  /* {planetas && 
        <FeatureGroup>
          {planetas.map((p) => (
            <CircleMarker key={`${p.technicalId}|${p.RandDist}`} center={[p.Y, p.X]} radius={2}>
              <Popup>{p.Name}</Popup>
              <Tooltip permanent direction={"bottom"} className={styles.etiquetaPlaneta}>{p.Name}</Tooltip>
            </CircleMarker>
          ))}
        </FeatureGroup>
      } */
  return (
    <MapContainer className={styles.mapa} center={[0,0]} zoom={7} ref={mapRef}>
    </MapContainer>
  );
}
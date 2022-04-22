/*
  Coordenadas de https://docs.google.com/spreadsheets/d/19zafALbE-mchYDKZgkJR-kmxrt2_KY57FS7tzkQSMEE/htmlview
  São 15x os valores das coordenadas de http://www.swgalaxymap.com/
*/


import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

import styles from "./styles.module.css";

export default function Mapa(props) {
  const {className, tamanho, cor} = props;

  return (
    <MapContainer className={styles.mapa} center={[0,0]} zoom={13} scrollWheelZoom>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url=""
      />
      <Marker position={[0,0]}>
        <Popup>
          Popup de teste<br/>Customizável
        </Popup>
      </Marker>
    </MapContainer>
  );
}
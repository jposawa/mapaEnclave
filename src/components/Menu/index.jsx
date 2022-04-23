import React from "react";
import {useControle} from "../../hooks";
import {HomeOutlined, AppstoreOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";

import styles from "./styles.module.css";

export default function Menu() {
  const location = useLocation();
  const {setMostraModal} = useControle();

  const isThisLocation = (nomePagina) => {
    return location.pathname === `/${nomePagina}`;
  }
  
  return (
    <nav className={styles.menu} onClick={() => {setMostraModal(false)}}>
      <span className={styles.fundo}/>
            
      <Link to="/inicio" className={(isThisLocation("inicio") || isThisLocation("")) ? styles.selecionado : undefined}>
        <HomeOutlined />
        <p>Início</p>
      </Link>

      <Link to="/mapa" className={isThisLocation("mapa") ? styles.selecionado : undefined}>
        <AppstoreOutlined />
        <p>Mapa</p>
      </Link>
    </nav>
  )
}
import React from "react";
import {useControle} from "../../hooks";
import { GatewayOutlined, ForkOutlined} from "@ant-design/icons";
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
            
      <Link to="/astrogacao" className={(isThisLocation("astrogacao")) ? styles.selecionado : undefined}>
        <ForkOutlined />
        <p>Navegar</p>
      </Link>

      <Link to="/mapa" className={(isThisLocation("mapa") || isThisLocation("")) ? styles.selecionado : undefined}>
        <GatewayOutlined />
        <p>Mapa</p>
      </Link>
    </nav>
  )
}
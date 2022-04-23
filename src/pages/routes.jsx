import React from "react";
import {Routes as Switch, Route} from "react-router-dom";

import Inicio from "./Inicio";
import Jogo from "./Jogo";
import PaginaMapa from "./PaginaMapa";

export default function Routes() {
  return(
    <>
      <Switch>
        <Route exact path="/" element={<Inicio/>} />
        <Route path="/inicio" element={<Inicio/>} />
        <Route path="/mapa" element={<PaginaMapa/>} />
      </Switch>
    </>
  );
}
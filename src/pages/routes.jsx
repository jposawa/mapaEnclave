import React from "react";
import {Routes as Switch, Route} from "react-router-dom";

import Astrogacao from "./Astrogacao";
import Jogo from "./Jogo";
import PaginaMapa from "./PaginaMapa";

export default function Routes() {
  return(
    <>
      <Switch>
        <Route exact path="/" element={<PaginaMapa/>} />
        <Route path="/mapa" element={<PaginaMapa/>} />
        <Route path="/astrogacao" element={<Astrogacao/>} />
      </Switch>
    </>
  );
}
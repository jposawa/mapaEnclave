import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ControleProvider} from "./hooks/controle";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ControleProvider>
        <App />
      </ControleProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

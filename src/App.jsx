import React from 'react';
import './App.css';
import './temas.css';

import Routes from "./pages/routes.jsx";

import Menu from "./components/Menu";

function App() {
  return (
    <div className="corpoSite temaPrincipal">
      <main>
        <Routes/>
      </main>

      <Menu/>
    </div>
  );
}

export default App;
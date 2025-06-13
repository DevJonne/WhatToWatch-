import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      {/* Renderiza as rotas filhas aqui */}
      <Outlet />
    </div>
  );
}

export default App;

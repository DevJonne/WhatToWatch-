import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Movie from "./pages/Movie";       // Página de detalhes do filme
import Search from "./pages/Search";     // Página de pesquisa

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout principal (com Navbar) */}
        <Route element={<App />}>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Página de detalhes do filme */}
          <Route path="movie/:id" element={<Movie />} />

          {/* Página de busca */}
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

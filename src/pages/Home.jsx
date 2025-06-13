import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import GenreCarousel from "../components/GenreCarousel";
import "../components/GenreCarousel.css";
import "./MoviesGrid.css";

const baseURL = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // Busca os top 6 filmes
  const getTopRatedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("Top Rated Response:", data);

      if (data && data.results) {
        setTopMovies(data.results.slice(0, 6)); // Pega apenas os 6 melhores
      } else {
        console.warn("topRatedMovies sem 'results':", data);
      }
    } catch (err) {
      console.error("Erro ao buscar top rated movies:", err);
    }
  };

  // Busca os gêneros de filmes
  const getGenres = async () => {
    try {
      const url = `${baseURL}genre/movie/list?${apiKey}&language=pt-BR`;
      const res = await fetch(url);
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${baseURL}movie/top_rated?${apiKey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
    getGenres();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Amados pelos Críticos:</h2>
      <div className="movies-container">
        {topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Carrosséis por gênero */}
     {genres.map((genre) => (
        <GenreCarousel key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export default Home;

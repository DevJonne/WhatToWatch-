import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./GenreCarousel.css";          

const baseURL = import.meta.env.VITE_BASE_API;
const apiKey  = import.meta.env.VITE_API_KEY;

const RelatedCarousel = ({ movieId, type = "similar" }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const endpoint = type === "recommendations" ? "recommendations" : "similar";
        const url = `${baseURL}movie/${movieId}/${endpoint}?${apiKey}&language=pt-BR`;
        const res  = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(`Erro ao buscar ${type}:`, err);
      }
    };

    if (movieId) fetchRelated();
  }, [movieId, type]);

  if (!movies.length) return null;        // nada a mostrar

  return (
    <div className="carousel-section">
      <h3>{type === "similar" ? "Filmes semelhantes" : "Recomendações"}</h3>
      <div className="carousel">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
};

export default RelatedCarousel;

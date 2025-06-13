import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./GenreCarousel.css"; // não esqueça do CSS

const baseURL = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const GenreCarousel = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const url = `${baseURL}discover/movie?${apiKey}&with_genres=${genre.id}&language=pt-BR`;
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(`Erro ao buscar filmes do gênero ${genre.name}:`, error);
      }
    };

    fetchMoviesByGenre();
  }, [genre.id, genre.name]);

  return (
    <div className="carousel-section">
      <h3>{genre.name}</h3>
      <div className="carousel">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenreCarousel;

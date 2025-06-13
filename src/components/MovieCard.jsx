import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const baseURL = import.meta.env.VITE_BASE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    let timeout;

    const fetchTrailer = async () => {
      setLoadingTrailer(true);
      try {
        const res = await fetch(`${baseURL}movie/${movie.id}/videos?${apiKey}&language=pt-BR`);
        const data = await res.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (err) {
        console.error("Erro ao buscar trailer:", err);
        setTrailerKey(null);
      } finally {
        setLoadingTrailer(false);
      }
    };

    if (hovered) {
      // Pequeno delay para evitar chamadas desnecessárias
      timeout = setTimeout(fetchTrailer, 300);
    }

    return () => {
      clearTimeout(timeout);
      setTrailerKey(null); // Limpa trailer ao sair
    };
  }, [hovered, movie.id]);

  return (
<div
  className="movie-card"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  {/* Sempre exibe o pôster como plano de fundo caso não tenha trailer */}
  <img
    src={baseImgUrl + movie.poster_path}
    alt={movie.title}
    className={`poster-img ${hovered && trailerKey ? "hidden" : ""}`}
  />

  {/* Trailer em destaque durante o hover */}
  {hovered && (
    <>
      {loadingTrailer ? (
        <div className="no-trailer">Carregando...</div>
      ) : trailerKey ? (
        <div className="trailer-wrapper">
          <iframe
            className="trailer-iframe"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="no-trailer">Trailer indisponível</div>
      )}
    </>
  )}

  {/* Info que sempre aparece (titulo e botão) */}
  <div className="card-info">
    <h2>{movie.title}</h2>
    <Link to={`/movie/${movie.id}`} className="details-button">Saiba Mais</Link>
  </div>
</div>

  );
};

export default MovieCard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";                // novo modal
import "./SimpleCard.css";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const baseURL   = import.meta.env.VITE_BASE_API;
const apiKey    = import.meta.env.VITE_API_KEY;

const SimpleCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showModal, setShowModal]   = useState(false);

  // Busca do trailer (só uma vez por filme)
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res  = await fetch(`${baseURL}movie/${movie.id}/videos?${apiKey}&language=pt-BR`);
        const data = await res.json();
        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Erro ao buscar trailer:", err);
      }
    };
    if (movie?.id) fetchTrailer();
  }, [movie?.id]);

  if (!movie) return null;

  return (
    <>
      <div className="simple-card">
        <img
          src={baseImgUrl + movie.poster_path}
          alt={movie.title}
          className="poster-img-detail"
        />

        <div className="info-detail">
          {trailerKey && (
            <button className="btn-trailer" onClick={() => setShowModal(true)}>
              Ver trailer
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          trailerKey={trailerKey}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SimpleCard;

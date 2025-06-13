import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsTag,
} from "react-icons/bs";

import SimpleCard from "../components/SimpleCard";
import RelatedCarousel from "../components/RelatedCarousel";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number) =>
    number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  useEffect(() => {
    getMovie(`${moviesURL}${id}?${apiKey}`);
  }, [id]);

  if (!movie) return null;

  return (
    <>
      {/* ——— Detalhes do filme ——— */}
      <div className="movie-page">
        <SimpleCard movie={movie} />
        <h2 className="movieTitle">{movie.title}</h2>

        <p className="tagline">{movie.tagline}</p>

        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>

        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>

        {movie.genres?.length > 0 && (
          <div className="info">
            <h3>
              <BsTag /> Gênero{movie.genres.length > 1 ? "s" : ""}:
            </h3>
            <p>{movie.genres.map((g) => g.name).join(", ")}</p>
          </div>
        )}

        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>

        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* ——— Carrossel de filmes semelhantes (fora da .movie-page) ——— */}
      <RelatedCarousel movieId={movie.id} type="similar" />
    </>
  );
};
export default Movie;

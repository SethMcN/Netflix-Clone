import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MediaCard.css";
// slider library
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function MediaCard(props) {
  const genre = props.genre;
  const movies = props.movies;
  const navigate = useNavigate();

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 8,
      spacing: 0,
    },
    breakpoints: {
      "(max-width: 500px)": {
        slides: {
          perView: 1,
        },
        loop: false,
      },
      "(max-width: 800px)": {
        slides: {
          perView: 2,
        },
        loop: true,
      },
      "(min-width: 801px)": {
        slides: {
          perView: 6,
        },
        loop: true,
      },
    },
    created(s) {
      window.dispatchEvent(new Event("created"));
    },
  });

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h1>{genre}</h1>
      <div ref={sliderRef} className="keen-slider">
        {movies.map((movie) => (
          <div
            className="keen-slider__slide movie-card"
            key={movie.id}
            onClick={() => handleCardClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

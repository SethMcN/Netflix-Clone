import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpecificMovie } from "../../FetchData";
import "./MovieInfoStyle.css"



export default function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await fetchSpecificMovie(movieId);
      setMovie(fetchedMovie);
      console.log(fetchedMovie);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-info-container">
      <h1 className="movie-title">{movie.title}</h1>
      <img className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <span className="movie-overview"> {movie.overview} </span>
      <span className="release-date">Release Date: {movie.release_date}</span>
      <span className="rating">Rating: {movie.vote_average}/10</span>
    </div>
  );
}

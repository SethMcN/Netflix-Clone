import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpecificMovie } from "../../FetchData";

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
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
}

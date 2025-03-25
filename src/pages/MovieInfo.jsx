import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpecificMovie } from "../../FetchData";
import "./MovieInfoStyle.css";

export default function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await fetchSpecificMovie(movieId);
      setMovie(fetchedMovie);

      // Check if the movie is already in the watchlist
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const isMovieInWatchlist = watchlist.some(
        (item) => item.id === fetchedMovie.id
      );
      setIsInWatchlist(isMovieInWatchlist);
    };

    fetchMovie();
  }, [movieId]);

  const handleWatchlistToggle = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (isInWatchlist) {
      // Remove the movie from the watchlist
      const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } else {
      // Add the movie to the watchlist
      watchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }

    setIsInWatchlist((prev) => !prev);
  };

  if (!movie) {
    return <div></div>;
  }

  return (
    <div className="movie-info-container">
      <h1 className="movie-title">{movie.title}</h1>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <span className="movie-overview"> {movie.overview} </span>
      <span className="release-date">Release Date: {movie.release_date}</span>
      <span className="rating">Rating: {movie.vote_average}/10</span>
      <button className="watchlist-button" onClick={handleWatchlistToggle}>
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

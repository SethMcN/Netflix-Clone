import { React, useState, useEffect } from "react";
import "./HomeMediaPageStyle.css";
import MediaCard from "./MediaCard/MediaCard.jsx";

export default function HomeMediaPage(props) {
  const popularMovies = props.movies;
  const genreMoviesList = props.genreMoviesList;

  const horror =
    genreMoviesList.find((genre) => genre.genre.toLowerCase() === "horror")
      ?.movies || [];

  const scienceFiction =
    genreMoviesList.find(
      (genre) => genre.genre.toLowerCase() === "science fiction"
    )?.movies || [];

  const Comedy =
    genreMoviesList.find((genre) => genre.genre.toLowerCase() === "comedy")
      ?.movies || [];

  // Get watchlist from localStorage
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div className="home-media-container">
      <MediaCard movies={popularMovies} genre={"Popular"} />
      <MediaCard movies={horror} genre={"Horror"} />
      <MediaCard movies={scienceFiction} genre={"Science Fiction"} />
      <MediaCard movies={Comedy} genre={"Comedy"} />
      <MediaCard movies={watchlist} genre={"Watch List"} />
    </div>
  );
}

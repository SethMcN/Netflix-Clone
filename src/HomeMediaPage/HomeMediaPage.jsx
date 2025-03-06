import { React, useState } from "react";
import "./HomeMediaPageStyle.css";
import MediaCard from "./MediaCard/MediaCard.jsx";

export default function HomeMediaPage(props) {

  const popularMovies = props.movies;
  const genreMoviesList = props.genreMoviesList;

  const horror =
    genreMoviesList.find((genre) => genre.genre.toLowerCase() === "horror") ?.movies || [];

  const scienceFiction =
    genreMoviesList.find((genre) => genre.genre.toLowerCase() === "science fiction")?.movies || [];

  const Comedy =
    genreMoviesList.find((genre) => genre.genre.toLowerCase() === "comedy" )?.movies || [];

  
  return (
    <div className="home-media-container">
      <MediaCard movies={popularMovies} genre={"popular"}/>
      <MediaCard movies={horror} genre={"horror"} />
      <MediaCard movies={scienceFiction} genre={"Science Fiction"} />
      <MediaCard movies={Comedy} genre={"comedy"} />
    </div>
  );
}

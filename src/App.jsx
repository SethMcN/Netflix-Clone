import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./pages/NavigationBar";
import HomeMediaPage from "./HomeMediaPage/HomeMediaPage";
import ProfilesPage from "./pages/ProfilesPage";
import MovieInfo from "./pages/MovieInfo";
import SearchPage from "./pages/SearchPage";
import { fetchFromTMDB, fetchGenres } from "../FetchData";

function App() {
  const [movies, setMovies] = useState([]);
  const [genreMoviesList, setGenreMoviesList] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const fetchPopMovies = async () => {
      const data = await fetchFromTMDB(10);
      setMovies(data);
    };

    const fetchGenreSpec = async (genreName) => {
      const genres = await fetchGenres();

      const genre = genres.find((g) => {
        return g.name.toLowerCase() === genreName.toLowerCase();
      });

      if (genre) {
        const data = await fetchFromTMDB(5,genre.id);
        setGenreMoviesList((prevList) => [
          ...prevList,
          { movies: data, genre: genre.name },
        ]);
      } else {
        console.error(`Genre ${genreName} not found`);
      }
    };

    fetchPopMovies();
    fetchGenreSpec("horror");
    fetchGenreSpec("Science Fiction");
    fetchGenreSpec("Comedy");
  }, []);

  window.addEventListener("offline", function () {
    alert("Oops! You are offline now!");
  });

  return (
    <div className="main-window">
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <HomeMediaPage movies={movies} genreMoviesList={genreMoviesList} />
          }
        />
        <Route path="/profiles" element={<ProfilesPage signedIn={signedIn} setSignedIn={setSignedIn} />} />
        <Route path="/movie/:movieId" element={<MovieInfo movies={movies} />} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </div>
  );
}

export default App;


const BASE_URL  = "https://api.themoviedb.org/3";
const API_KEY =  import.meta.env.VITE_REACT_APP_TMDB_API_KEY


async function fetchFromTMDB() {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&page=1&with_original_language=en`);
    const data = await response.json();
    return data.results;
}

async function fetchGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

async function fetchMoviesByGenre(genreId) {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=en-US&with_original_language=en`);
    const data = await response.json();
    return data.results;
}

async function fetchSpecificMovie(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}}/videos?language=en-US&sort_by=popularity.desc&api_key=${API_KEY}`);
    const movies = await response.json();
    const data = movies.find((movie) => movie.id === movieId);
    return data;
}

async function searchForMovies (search){
    const response = await fetch(`${BASE_URL}/search/movie?&sort_by=popularity.desc&original_language=en&include_adult=false&language=en-US&query=${search}&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results ? data.results.sort((a, b) => b.vote_count - a.vote_count) : [];
}


export { fetchFromTMDB, fetchMoviesByGenre, fetchGenres, fetchSpecificMovie, searchForMovies }

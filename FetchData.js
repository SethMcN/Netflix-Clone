
const BASE_URL  = "https://api.themoviedb.org/3";
const API_KEY =  import.meta.env.VITE_REACT_APP_TMDB_API_KEY


async function fetchFromTMDB(pages = 5,genreId = undefined) {
    let movies = new Map(); 
    let data; 

    for (let i = 1; i <= pages; i++) {

        if (genreId == undefined){
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&page=${i}&with_original_language=en`)
            data = await response.json();
        }       
        
        else{
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=${i}&with_original_language=en`)
            data = await response.json();
        }

        data.results.forEach(movie => {
            if (movie.backdrop_path !== null && movie.vote_count > 10) {
                movies.set(movie.id, movie); 
            }
        });
    }
    const sortedMovies = Array.from(movies.values()).sort((a, b) => b.vote_count - a.vote_count);
    
    console.log(sortedMovies);
    return sortedMovies;
}


async function fetchGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

async function fetchSpecificMovie(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US&sort_by=popularity.desc&api_key=${API_KEY}`);
    const movies = await response.json();
    console.log("movies: ",movies)
    return movies;
}

async function searchForMovies (search){
    const response = await fetch(`${BASE_URL}/search/movie?&sort_by=popularity.desc&original_language=en&include_adult=false&language=en-US&query=${search}&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results ? data.results.sort((a, b) => b.vote_count - a.vote_count) : [];
}


export { fetchFromTMDB, fetchGenres, fetchSpecificMovie, searchForMovies }

import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import MediaCard from "../HomeMediaPage/MediaCard/MediaCard"
import { searchForMovies } from '../../FetchData';
import './SearchPage.css'

export default function SearchPage() {

    const [searchItem, setSearchItem] = useState("")
    const [movies, setMovies] = useState([])

    const SearchItem = async (e) => {
        e.preventDefault(); 
        const results = await searchForMovies(searchItem)
        setMovies(results)
        console.log(results)
    }
    console.log('Movies state:', movies); 

    return (
        <div className='search-page'>
            <div className='search-bar'>
                <form action="" onSubmit={SearchItem}>
                    <input type="text" placeholder="Search.." name="search" onChange={(e) => setSearchItem(e.target.value)} />
                    <button type="submit"><i className="fa fa-search"><FaSearch /></i></button>
                </form>
            </div>
            <div className='search-page-results'>
                <MediaCard genre={"Results"} movies={movies} loop={false} />
            </div>
        </div>
    )
}

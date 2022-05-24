
// Libs
import React from "react";
import { useState, useEffect } from "react";

// CSS files
import "./App.css";

// All of the other assets
import searchIcon from "./search.svg"

// All of the components
import MovieCard from "./MovieCard"


// ⬇️⬇️⬇️ Start coding bellow ⬇️⬇️⬇️


// Define the API key
const API_KEY = "<API_KEY>"
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`


// App Component
const App = () => {
    // State variables. React way of creating a variable to keep track of something.
    let [movies, setMovies] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");


    // Function to search movies
    const searchMovies = async (title) => {
        
        const response = await fetch(`${API_URL}&s=${title}`)       // Example API search query: https://www.omdbapi.com/?apikey=<API_KEY>&s=batman
        const data = await response.json()                          // Now we have access to the JSON response from omdbapi.com

        setMovies(movies = data.Search);

    }

    // Fetch search some movie when user enters our application for the first time
    useEffect(() => {
        searchMovies("spider man")
    }, [])


    return(
        
        <div className="app">
            <h1>Movie ~ Land</h1>

            <div className="search">
                <input placeholder="Search for movies" value={ searchTerm } onChange={ (e) => setSearchTerm(e.target.value) } />
                <img src={searchIcon} alt="Search Icon" onClick={ () => searchMovies(searchTerm) } />
            </div>

            {
                // Check if a movie can or cannot be found
                movies.length > 0
                ? (
                    <div className="container">
                        { movies.map((movie) => {
                            return < MovieCard movie={movie} />
                        }) }
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found.</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App;
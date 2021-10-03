import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// initial state
const initialState = {
    popularMovies: [],
    popularSeries: [],
    searchedMovies: [],
    searchedSeries: [],
    watchlistMovies: [],
    watchlistSeries: [],
    loading: false
}

// create context
export const GlobalContext = createContext(initialState);

// provier component
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getPopularMovies = async () => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`);

        // console.log(data.results);

        dispatch({
            type: 'GET_POPULAR_MOVIES',
            payload: data.results
        })
    }

    const getPopularSeries = async () => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`);

        dispatch({
            type: 'GET_POPULAR_SERIES',
            payload: data.results
        })
    }

    const getSearchedMovies = async (searchTerm) => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`);
        console.log(data.results);

        dispatch({
            type: 'GET_SEARCHED_MOVIES',
            payload: data.results.filter(item => item.title !== 'UNdefined')
        })
    }
    
    const getSearchedSeries = async (searchTerm) => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`);
        
        console.log(data.results);

        dispatch({
            type: 'GET_SEARCHED_SERIES',
            payload: data.results
        })
    }

    // Actions
    const addMovieToWatchlist = movie => {
        dispatch({
            type: 'ADD_MOVIE_TO_WATCHLIST',
            payload: movie
        })
    }

    return (
        <GlobalContext.Provider value={{
            popularMovies: state.popularMovies,
            popularSeries: state.popularSeries,
            searchedMovies: state.searchedMovies,
            searchedSeries: state.searchedSeries,
            watchlistMovies: state.watchlistMovies,
            watchlistSeries: state.watchlistSeries,
            loading: state.loading,
            getPopularMovies,
            getPopularSeries,
            getSearchedMovies,
            getSearchedSeries,
            addMovieToWatchlist,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
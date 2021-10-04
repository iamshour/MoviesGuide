import axios from 'axios';
import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// initial state
const initialState = {
    showMovies: [],
    showSeries: [],
    watchlistMovies: [],
    watchlistSeries: [],
    loading: false,
    alert: null,
    headline: ''
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    const getPopularMovies = async () => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`);
            // Request Succeeded!
            dispatch({
                type: 'GET_POPULAR_MOVIES',
                payload: response.data.results
            })
          } catch (error) {
            // Request Failed!
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    const getPopularSeries = async () => {

        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`);
            // Request Succeeded!
            dispatch({
                type: 'GET_POPULAR_SERIES',
                payload: response.data.results
            })
          } catch (error) {
            // Request Failed!
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    const getSearchedMovies = async (searchTerm) => {

        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`);
            // Request Succeeded!
            console.log(response);
            dispatch({
                type: 'GET_SEARCHED_MOVIES',
                payload: response.data.results.filter(item => item.title !== 'UNdefined')
            })
          } catch (error) {
            // Request Failed!
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }
    
    const getSearchedSeries = async (searchTerm) => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`);
            // Request Succeeded!
            console.log(response);
            dispatch({
                type: 'GET_SEARCHED_SERIES',
                payload: response.data.results
            })
          } catch (error) {
            // Request Failed!
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    const setAlert = (message, type) => {
        dispatch({
            type:  'SET_ALERT',
            payload: {
                message,
                type
            }
        })

        setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 2000)
    }

    const addMovieToWatchlist = movie => {
        dispatch({
            type: 'ADD_MOVIE_TO_WATCHLIST',
            payload: movie
        })
    }

    return (
        <GlobalContext.Provider value={{
            ...state,
            getPopularMovies,
            getPopularSeries,
            getSearchedMovies,
            getSearchedSeries,
            setAlert,
            addMovieToWatchlist,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
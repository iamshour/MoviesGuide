import axios from 'axios';
import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// initial state
const initialState = {
    showItems: [],
    singleItem: {},
    watchlistMovies: [],
    watchlistSeries: [],
    loading: false,
    alert: null,
    headline: '',
    location: 0
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    const getPopularItems = async (media_type) => {

        dispatch({
            type: 'SET_LOADING'
        })
        
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=${process.env.REACT_APP_API_KEY}`);
            // Request Succeeded!
            dispatch({
                type: 'GET_POPULAR_ITEMS',
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

    const getSearchResults = async (searchTerm, media_type) => {

        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/${media_type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`);
            dispatch({
                type: 'GET_SEARCH_RESULTS',
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
    
    const getSingleItem = async ( media_type, id) => {

        dispatch({
            type: 'SET_LOADING'
        })

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            dispatch({
                type: 'SET_SINGLE_ITEM',
                payload: response.data
            })
            console.log(response.data)
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

    const setLocation = (data) => {
        dispatch({
            type:  'SET_LOCATION',
            payload: data
        })
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
            getPopularItems,
            getSearchResults,
            getSingleItem,
            setAlert,
            addMovieToWatchlist,
            setLocation
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
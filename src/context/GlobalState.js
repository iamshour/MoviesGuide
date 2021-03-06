import axios from "axios"
import { createContext, useEffect, useReducer } from "react"
import AppReducer from "./AppReducer"

// initial state
const initialState = {
	showItems: [],
	favoriteMovies: localStorage.getItem('favoriteMovies') ? JSON.parse(localStorage.getItem('favoriteMovies')) : [],
	favoriteSeries: localStorage.getItem('favoriteSeries') ? JSON.parse(localStorage.getItem('favoriteSeries')) : [],
	loading: false,
	alert: null,
	headline: "",
	location: 0,
	numOfPages: 1
}

// create context
export const GlobalContext = createContext(initialState)

// provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState)

	useEffect(() => {
		localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies))
		localStorage.setItem('favoriteSeries', JSON.stringify(state.favoriteSeries))
	}, [state])

	// Actions
	const getPopularItems = async (media_type, page) => {
		dispatch({
			type: "SET_LOADING",
		})

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
			)
			// Request Succeeded!
			dispatch({
				type: "GET_ITEMS",
				payload: response.data,
			})
		} catch (error) {
			// Request Failed!
			if (error.response) {
				// The request was made and the server responded with a status code that falls out of the range of 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message)
			}
		}
	}

	const getActors = async (page) => {
		dispatch({
			type: "SET_LOADING",
		})

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
			)
			// Request Succeeded!
			dispatch({
				type: "GET_ITEMS",
				payload: response.data,
			})
			console.log(response.data.results)
		} catch (error) {
			// Request Failed!
			if (error.response) {
				// The request was made and the server responded with a status code that falls out of the range of 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message)
			}
		}
	}

	const getSearchResults = async (searchTerm, media_type) => {
		dispatch({
			type: "SET_LOADING",
		})

		try {
			if (state.location !== 2) {
				const response = await axios.get(
					`https://api.themoviedb.org/3/search/${media_type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&include_adult=false`
				)
				dispatch({
					type: "GET_SEARCH_RESULTS",
					payload: response.data.results.filter(
						(item) => item.title !== "UNdefined"
					),
				}) 
			} else {
				const response = await axios.get(
					`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`
				)
				dispatch({
					type: "GET_SEARCH_RESULTS",
					payload: response.data.results
				}) 
				console.log(response)
			}
		} catch (error) {
			// Request Failed!
			if (error.response) {
				// The request was made and the server responded with a status code that falls out of the range of 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received.`error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message)
			}
		}
	}

	const setAlert = (message, type) => {
		dispatch({
			type: "SET_ALERT",
			payload: {
				message,
				type,
			},
		})

		setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 2000)
	}

	const setLocation = (data) => {
		dispatch({
			type: "SET_LOCATION",
			payload: data,
		})
	}

	const addFavoriteMovie = (movie) => {
		dispatch({
			type: "ADD_FAVORITE_MOVIE",
			payload: movie,
		})
	}

	const removeFavoriteMovie = (id) => {
		dispatch({
			type: "REMOVE_FAVORITE_MOVIE",
			payload: id
		})
	}
	
	const addFavoriteSeries = (series) => {
		dispatch({
			type: "ADD_FAVORITE_SERIES",
			payload: series,
		})
	}

	const removeFavoriteSeries = (id) => {
		dispatch({
			type: "REMOVE_FAVORITE_SERIES",
			payload: id
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				...state,
				getPopularItems,
				getSearchResults,
				setAlert,
				addFavoriteMovie,
				removeFavoriteMovie,
				addFavoriteSeries,
				removeFavoriteSeries,
				setLocation,
				getActors
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

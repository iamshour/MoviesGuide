const AppReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: true,
			}

		case "GET_ITEMS":
			return {
				...state,
				showItems: action.payload.results,
				numOfPages: action.payload.total_pages,
				loading: false,
				headline:
					state.location === 0
						? "Popular movies"
						: state.location === 1
						? "Popular series"
						: state.location === 2
						? "Popular Actors"
						: null,
			}

		case "GET_SEARCH_RESULTS":
			return {
				...state,
				showItems: action.payload,
				loading: false,
				headline: "Search Results",
			}

		case "SET_ALERT":
			return {
				...state,
				alert: action.payload,
			}

		case "SET_LOCATION":
			return {
				...state,
				location: action.payload,
			}

		case "REMOVE_ALERT":
			return {
				...state,
				alert: null,
			}

		case "ADD_FAVORITE_MOVIE":
			return {
				...state,
				favoriteMovies: [action.payload, ...state.favoriteMovies],
			}

		case "REMOVE_FAVORITE_MOVIE":
			return {
				...state,
				favoriteMovies: state.favoriteMovies.filter(
					(movie) => movie.id !== action.payload
				),
			}

		case "ADD_FAVORITE_SERIES":
			return {
				...state,
				favoriteSeries: [action.payload, ...state.favoriteSeries],
			}

		case "REMOVE_FAVORITE_SERIES":
			return {
				...state,
				favoriteSeries: state.favoriteSeries.filter(
					(series) => series.id !== action.payload
				),
			}

		default:
			return state
	}
}

export default AppReducer

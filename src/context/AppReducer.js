const AppReducer = (state, action) => {

	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: true,
			}

		case "GET_POPULAR_ITEMS":
			return {
				...state,
				showItems: action.payload,
				loading: false,
				headline: state.location === 0 ? "Popular movies" : state.location === 1 ? "Popular series" : null, 
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

		case "ADD_MOVIE_TO_WATCHLIST":
			return {
				...state,
				watchlist: [action.payload, ...state.watchlist],
			}
		default:
			return state
	}
}

export default AppReducer

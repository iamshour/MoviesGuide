const AppReducer = (state, action) => {

	const pathname = window.location.pathname

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
				headline: pathname === '/' ? "Popular movies" : pathname === '/series' ? "Popular series" : null, 
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

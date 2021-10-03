const AppReducer = (state, action) => {
    switch(action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        
            case 'GET_POPULAR_MOVIES':
            return {
                ...state,
                popularMovies: action.payload,
                loading: false
            }

            case 'GET_POPULAR_SERIES':
            return {
                ...state,
                popularSeries: action.payload,
                loading: false
            }

            case 'GET_SEARCHED_MOVIES':
            return {
                ...state,
                searchedMovies: action.payload,
                loading: false,
            }

            case 'GET_SEARCHED_SERIES':
            return {
                ...state,
                searchedSeries: action.payload,
                loading: false,
            }
            
        case 'ADD_MOVIE_TO_WATCHLIST':
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist]
            }
        default:
            return state;
    }
}

export default AppReducer
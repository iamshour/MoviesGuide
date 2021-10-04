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
                showMovies: action.payload,
                loading: false,
                headline: 'Popular Movies'
            }

            case 'GET_POPULAR_SERIES':
            return {
                ...state,
                showSeries: action.payload,
                loading: false,
                headline: 'Popular Series'
            }

            case 'GET_SEARCHED_MOVIES':
            return {
                ...state,
                showMovies: action.payload,
                loading: false,
                headline: 'Search Results'
            }

            case 'GET_SEARCHED_SERIES':
            return {
                ...state,
                showSeries: action.payload,
                loading: false,
                headline: 'Search Results'
            }

            case 'SET_ALERT':
            return {
                ...state,
                alert: action.payload
            }
            
            case 'REMOVE_ALERT': 
            return {
                ...state,
                alert: null
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
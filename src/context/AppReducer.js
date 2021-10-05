const AppReducer = (state, action) => {
    switch(action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        
            case 'GET_POPULAR_ITEMS':
            return {
                ...state,
                singleItem: {},
                showItems: action.payload,
                loading: false,
                headline: 'Popular items'
            }

            case 'GET_SEARCH_RESULTS':
            return {
                ...state,
                showItems: action.payload,
                loading: false,
                headline: 'Search Results'
            }

            case 'SET_SINGLE_ITEM':
            return {
                ...state,
                singleItem: action.payload,
                loading: false
            }

            case 'SET_ALERT':
            return {
                ...state,
                alert: action.payload
            }

            case 'SET_LOCATION':
            return {
                ...state,
                location: action.payload
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
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Header from "./Header"
import SearchComponent from "./SearchComponent"
import BottomNav from './BottomNav'

const Layout = ({children}) => {

    const {location, headline} = useContext(GlobalContext)

    return (
        <>
            <Header />
            { location === 0 || location === 1 || location === 2 ?
                <SearchComponent /> : null
            }
            <div
                className='headline'
            >
                <h1>{location === 0 || location === 1 || location === 2 ? headline : 'Your Favorite Picks!'}</h1>
            </div>
            {children}
            <BottomNav />
        </>
    )
}

export default Layout

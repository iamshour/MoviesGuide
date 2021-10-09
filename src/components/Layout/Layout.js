import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Header from "./Header"
import SearchComponent from "./SearchComponent"
import BottomNav from './BottomNav'
import { motion } from "framer-motion"

const Layout = ({children}) => {

    const {location, headline} = useContext(GlobalContext)

    return (
        <>
            <Header />
            { location === 0 || location === 1 ?
                <SearchComponent /> : null
            }
            <motion.div
                className='headline'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
            <h1>{location === 0 || location === 1 ? headline : location === 2 ? 'Upcoming movies & series' : location === 3 ? 'Your Favorite Picks!' : ''}</h1>
            </motion.div>
            {children}
            <BottomNav />
        </>
    )
}

export default Layout

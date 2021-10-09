import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import Logo from '../../images/Logo.png';

const Header = () => {

    const {getPopularItems, location} = useContext(GlobalContext)

    return (
        <header>
            <Link
                to={location === 0 ? '/' : location === 1 ? '/series' : location === 2 ? '/favorites' : location === 3 ? '/about' : null} 
                onClick={() => {
                getPopularItems(location === 0 ? 'movie' : 'tv')
                }}
            >
                <motion.img 
                    src={Logo}
                    alt="MovieMania Logo"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                />
            </Link>
        </header>
    )
}

export default Header

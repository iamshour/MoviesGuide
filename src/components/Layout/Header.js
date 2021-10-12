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
                <img src={Logo} alt="MovieMania Logo" />
            </Link>
        </header>
    )
}

export default Header

import { useEffect, useContext } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/GlobalState';

//Icons
import { RiMovie2Line } from "react-icons/ri";
import { BiMovie } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Navbar = () => {

    const{ location, setLocation } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(() => {
        if (location === 0) history.push('/')
        else if (location === 1) history.push('/series')
        else if (location === 2) history.push('/actors')
        else if (location === 3) history.push('/favorites')
    }, [location, history])

    return (
        <BottomNavigation
            // showLabels
            value={location}
            onChange={(event, newValue) => {
                setLocation(newValue);
                window.scroll(0, 0)
            }}
            className='navbar'
        >
            <BottomNavigationAction 
                label="Movies" 
                icon={<RiMovie2Line className='nav-icon' />}
            />
            <BottomNavigationAction 
                label="Series" 
                icon={<BiMovie className='nav-icon' />}
            />
            <BottomNavigationAction 
                label="Actors" 
                icon={<BsFillPersonFill className='nav-icon' />} 
            />
            <BottomNavigationAction 
                label="Favorites" 
                icon={location === 3 ? <MdFavorite className='nav-icon' /> : <MdFavoriteBorder className='nav-icon'/>} 
            />
        </BottomNavigation>
    )
}

export default Navbar

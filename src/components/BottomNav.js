import { useEffect, useContext } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useHistory } from 'react-router';
import { GlobalContext } from '../context/GlobalState';

//Icons
import { RiMovie2Line } from "react-icons/ri";
import { BiMovie } from "react-icons/bi";
import { BsCardChecklist, BsInfoCircle } from "react-icons/bs";

const Navbar = () => {

    const{ location, setLocation } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(() => {
        if (location === 0) history.push('/')
        else if (location === 1) history.push('/series')
        else if (location === 2) history.push('/wishlist')
        else if (location === 3) history.push('/about')
    }, [location, history])

    return (
        <BottomNavigation
            // showLabels
            value={location}
            onChange={(event, newValue) => {
                setLocation(newValue);
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
                label="Wishlist" 
                icon={<BsCardChecklist className='nav-icon' />} 
            />
            <BottomNavigationAction
                label="About us" 
                icon={<BsInfoCircle className='nav-icon' />} 
            />
        </BottomNavigation>
    )
}

export default Navbar

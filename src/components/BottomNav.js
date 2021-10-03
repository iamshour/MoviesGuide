import { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useHistory } from 'react-router';

//Icons
import { RiMovie2Line } from "react-icons/ri";
import { BiMovie } from "react-icons/bi";
import { BsCardChecklist, BsInfoCircle } from "react-icons/bs";

const Navbar = () => {

    const [value, setValue] = useState('Movies');
    const history = useHistory();

    useEffect(() => {
        if (value === 0) history.push('/')
        else if (value === 1) history.push('/series')
        else if (value === 2) history.push('/wishlist')
        else if (value === 3) history.push('/about')
    }, [value, history])

    return (
        <BottomNavigation
            // showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
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

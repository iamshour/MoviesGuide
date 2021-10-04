import { useContext, useState } from "react";

//comps
import Alert from '../components/Alert';

//icons
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { GlobalContext } from "../context/GlobalState";

const SearchComponent = ({ func, searchTerm, setSearchTerm, clearSearch }) => {

    const { alert, setAlert } = useContext(GlobalContext);
    const [searchClicked, setSearchClicked] = useState(false);
    const pathname = window.location.pathname

    const submit = (e) => {
        e.preventDefault();
        
        if(searchTerm === '') {
            setAlert('please enter something', 'danger')
        } else {
            func(searchTerm);
        } 
    }

    return (
        <div className='search-container'>
            <button 
                className="switching-btn" 
                onClick={() => {
                    setSearchClicked(!searchClicked);
                    if(searchClicked) {
                        clearSearch()
                    }
                }}
                style={!searchClicked ? {color: '#9888f9', background: '#f2f2f2', border: '1px solid #9888f9'} : {color: '#f2f2f2', background: '#C8970C', border: '1px solid #7d5f08'}}
            >
                {searchClicked ? <VscChromeClose className='icon'/> : <BsSearch className='icon' />}
            </button>
            {searchClicked &&
                <>
                    { alert && 
                        <Alert 
                            type={alert.type}
                            message={alert.message}
                        /> 
                    }
                    <form onSubmit={submit}>
                        <input type="text" placeholder={pathname === '/' ? 'Search for a movie' : 'Search for a series'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <button>Search</button>
                    </form>
                </>
            }
        </div>
    )
}

export default SearchComponent

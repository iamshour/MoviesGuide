import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

const SearchComponent = ({ func, searchTerm, setSearchTerm }) => {

    const [searchClicked, setSearchClicked] = useState(false);
    const pathname = window.location.pathname

    const submit = (e) => {
        e.preventDefault();
        func(searchTerm);
    }

    return (
        <div className='search-container'>
            <button 
                className="switching-btn" 
                onClick={() => {
                    setSearchClicked(!searchClicked);
                    if(searchClicked) {
                        func()
                    }
                }}
                style={!searchClicked ? {color: '#9888f9', background: '#f2f2f2', border: '1px solid #9888f9'} : {color: '#f2f2f2', background: '#C8970C', border: '1px solid #7d5f08'}}
            >
                {searchClicked ? <VscChromeClose className='icon'/> : <BsSearch className='icon' />}
            </button>
            {searchClicked &&
                <form onSubmit={submit}>
                    <input type="text" placeholder={pathname === '/' ? 'Search for a movie' : 'Search for a series'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button>Search</button>
                </form>
            }
        </div>
    )
}

export default SearchComponent

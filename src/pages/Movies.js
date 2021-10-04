import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from '../context/GlobalState'
// Comps
import Loading from '../components/Loading';
import Card from '../components/Card';
import Headline from '../components/Headline';
import SearchComponent from '../components/SearchComponent';

const Movies = () => {

    const { showMovies, getPopularMovies, getSearchedMovies, loading, headline } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        getPopularMovies();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <SearchComponent
                func={getSearchedMovies}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                clearSearch={getPopularMovies}
            />
            { showMovies &&
                <>
                    <Headline text={headline} />
                    { loading ? <Loading /> :
                        <div className='card-container'>
                            {   showMovies.map((movie) => 
                                    <Card 
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        image={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        date={`Release date: ${movie.release_date}`}
                                        rating={movie.vote_average ? movie.vote_average : ''}
                                    />
                                )
                            }
                        </div>
                    }
                </>  
            }
        </>
    )
}

export default Movies

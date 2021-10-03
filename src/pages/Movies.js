import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from '../context/GlobalState'
// Comps
import Loading from '../components/Loading';
import Card from '../components/Card';
import Headline from '../components/Headline';
import SearchComponent from '../components/SearchComponent';

const Movies = () => {

    const { popularMovies, getPopularMovies, loading, getSearchedMovies, searchedMovies } = useContext(GlobalContext);
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
            />
            { searchedMovies.length > 0 ?
                <>
                    <Headline text={'Search results'} />
                    { loading ? <Loading /> :
                        <div className='card-container'>
                            { searchedMovies.length > 0 &&
                                searchedMovies.map((movie) => 
                                    <Card 
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        image={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        date={movie.release_date}
                                        rating={movie.vote_average ? movie.vote_average : ''}
                                    />
                                )
                            }
                        </div>
                    }
                </> : 
                <>
                    <Headline text={'Popular Movies'} />
                    { loading ? <Loading /> :
                        <div className='card-container'>
                            { popularMovies.length > 0 &&
                                popularMovies.map((movie) => 
                                    <Card 
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        image={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        date={movie.release_date}
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

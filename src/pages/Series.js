import { useContext, useEffect, useState } from 'react';
import {GlobalContext} from '../context/GlobalState'
// Comps
import Loading from '../components/Loading';
import Card from '../components/Card';
import Headline from '../components/Headline';
import SearchComponent from '../components/SearchComponent';

const Series = () => {

    const { popularSeries, getPopularSeries, loading, getSearchedSeries, searchedSeries } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        getPopularSeries();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <SearchComponent
                func={getSearchedSeries}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            { searchedSeries.length > 0 ?
                <>
                    <Headline text={'Search results'} />
                    {/* <button onClick={() => getSearchedSeries()}>Clear</button> */}
                    { loading ? <Loading /> :
                        <div className='card-container'>
                            { searchedSeries.length > 0 &&
                                searchedSeries.map((series) => 
                                    <Card 
                                        key={series.id}
                                        id={series.id}
                                        title={series.title}
                                        image={series.poster_path ? `https://image.tmdb.org/t/p/w300${series.poster_path}` : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        date={series.release_date}
                                        rating={series.vote_average ? series.vote_average : ''}
                                    />
                                )
                            }
                        </div>
                    }
                </> : 
                <>
                    <Headline text={'Popular Series'} />
                    { loading ? <Loading /> :
                        <div className='card-container'>
                            { popularSeries.length > 0 &&
                                popularSeries.map((series) => 
                                    <Card 
                                        key={series.id}
                                        id={series.id}
                                        title={series.title}
                                        image={series.poster_path ? `https://image.tmdb.org/t/p/w300${series.poster_path}` : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        date={series.release_date}
                                        rating={series.vote_average ? series.vote_average : ''}
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

export default Series

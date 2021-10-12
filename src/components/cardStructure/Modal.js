import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { img_large, img_small, unavailable_modal } from "../conditional/config";
import CastCarousel from "./CastCarousel";
//icons
import { VscChromeClose } from "react-icons/vsc"
import { AiOutlineLink } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { TiVideo } from "react-icons/ti";
import { BsFillStarFill } from "react-icons/bs"
import { GlobalContext } from "../../context/GlobalState";

const Modal = ({ setModalOpened, media_type, id }) => {

	const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie, favoriteSeries, addFavoriteSeries, removeFavoriteSeries, location } = useContext(GlobalContext);
	const [singleItem, setSingleItem] = useState({})
	const [video, setVideo] = useState()

	let storedMovie = favoriteMovies.find(o => o.id === singleItem.id)
	let storedSeries = favoriteSeries.find(o => o.id === singleItem.id)
	
	const fetchData = async () => {
		if (location === 2) {
			const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
			setSingleItem(data)
			console.log(data)
		} else {
			const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
			setSingleItem(data)
			console.log(data)
		}
	}

	const fetchVideo = async () => {
		const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
		setVideo(data.results[0]?.key);
	}

	useEffect(() => {
		fetchData();
		if(location !== 2) {
			fetchVideo();
		} 
		//eslint-disable-next-line
	}, [])

	const closeModal = (e) => {
		if (e.target.classList.contains("backdrop")) {
			setModalOpened(false)
			setSingleItem({})
			document.querySelector('html').style.overflowY = 'visible'
		}
	}

	return (
		<>
			{singleItem && (
				<div className='backdrop' onClick={closeModal}>
					<div className='modal'>
						<button 
							className="close-modal" 
							onClick={() => {
								setModalOpened(false)
								setSingleItem({})
								document.querySelector('html').style.overflowY = 'visible'
							}}
						>
							<VscChromeClose className='close-icon'/>
						</button>
						{ location !== 2 ?
							<>
								<div className="img-container">
									<img src={singleItem.backdrop_path ? `${img_large}/${singleItem.backdrop_path}` : unavailable_modal} alt={singleItem.title || singleItem.name} />	
								</div>
								<div className="content">
										<div className='top-content'>
											<h1 className='title'>{singleItem.title || singleItem.name}</h1>
											<div className="rating-year">
												<div className="rating">
													<BsFillStarFill className='rating-icon' />
													<h3>{singleItem.vote_average ? singleItem.vote_average : 'N/A'}</h3>
												</div>
												<h4 className='year'>
													|&nbsp;&nbsp;&nbsp;{(singleItem.release_date || singleItem.first_air_date || '----').substring(0, 4)}
												</h4>
											</div>
											<div className='genres-container'>
												{singleItem.genres &&
													singleItem.genres.map((genre) => (
														<h4 key={genre.id} className='genre'>{genre.name}</h4>
													))
												}
											</div>
											{/* <p>{singleItem.tagline && singleItem.tagline}</p> */}
										</div>
										<div className="content-cta">
											<a className="cta trailer" href={`https://www.youtube.com/watch?v=${video}`} rel='noreferrer' target='_blank'>
												<TiVideo className='cta-icon'/>
												<h2>Official Trailer</h2>
											</a>
											<a className="cta link" href={singleItem.homepage ? singleItem.homepage : `https://www.google.com/search?q=${singleItem.name || singleItem.title}`} rel='noreferrer' target='_blank'>
												<AiOutlineLink className='cta-icon' />
												<h2>Official page</h2>
											</a>
											{ media_type === 'movie' ?
												(storedMovie ? 
												<button className="cta wishlist" onClick={() => removeFavoriteMovie(singleItem.id)} style={{color: '#f1b918'}}>
													<MdFavorite className='cta-icon' />
													<h2>Already a favorite!</h2>
												</button> :
												<button className="cta wishlist" onClick={() => addFavoriteMovie(singleItem)}>
													<MdFavoriteBorder className='cta-icon'/>
													<h2>Add to Favorites</h2>
												</button>) :
											
												(storedSeries ? 
												<button className="cta wishlist" onClick={() => removeFavoriteSeries(singleItem.id)} style={{color: '#f1b918'}}>
													<MdFavorite className='cta-icon' />
													<h2>Already a favorite!</h2>
												</button> :
												<button className="cta wishlist" onClick={() => addFavoriteSeries(singleItem)}>
													<MdFavoriteBorder className='cta-icon'/>
													<h2>Add to Favorites</h2>
												</button>)
											}
										</div>
										<div className='overview'>
											<p>{singleItem.overview}</p>
										</div>
										<CastCarousel 
											media_type={media_type}
											id={id}
										/>
								</div> 
							</> :
							<>
								<div className="actor-img-container">
									<img src={singleItem.profile_path ? `${img_small}/${singleItem.profile_path}` : unavailable_modal} alt={singleItem.name} />
								</div>
							</>
						}
					</div>
				</div>
			)}
		</>
	)
}

export default Modal

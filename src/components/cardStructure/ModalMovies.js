import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../context/GlobalState"
import axios from "axios"
import { img_large, unavailable_modal } from "../conditional/config"
import CastCarousel from "./CastCarousel"
//Icons
import { AiOutlineLink } from "react-icons/ai"
import { BsFillStarFill } from "react-icons/bs"
import { MdFavorite, MdFavoriteBorder, MdInfoOutline } from "react-icons/md"
import { TiVideo } from "react-icons/ti"

const ModalMovies = ({ media_type, id }) => {
	const {
		favoriteMovies,
		addFavoriteMovie,
		removeFavoriteMovie,
		favoriteSeries,
		addFavoriteSeries,
		removeFavoriteSeries,
	} = useContext(GlobalContext)

	const [video, setVideo] = useState()
	const [item, setItem] = useState({})

	let storedMovie = favoriteMovies.find((o) => o.id === item.id)
	let storedSeries = favoriteSeries.find((o) => o.id === item.id)

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
		setItem(data)
		console.log(data)
	}

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
		setVideo(data.results[0]?.key)
	}

	useEffect(() => {
		fetchData()
		fetchVideo()
		//eslint-disable-next-line
	}, [])

	return (
		<>
			<div className='img-container'>
				<img
					src={
						item.backdrop_path
							? `${img_large}/${item.backdrop_path}`
							: unavailable_modal
					}
					alt={item.title || item.name}
				/>
			</div>
			<div className='content'>
				<div className='top-content'>
					<h1 className='title'>{item.title || item.name}</h1>
					<div className='rating-year'>
						<div className='rating'>
							<BsFillStarFill className='rating-icon' />
							<h3>{item.vote_average ? item.vote_average : "N/A"}</h3>
						</div>
						<h4 className='year'>
							|&nbsp;&nbsp;&nbsp;
							{(item.release_date || item.first_air_date || "----").substring(
								0,
								4
							)}
						</h4>
					</div>
					<div className='genres-container'>
						{item.genres &&
							item.genres.map((genre) => (
								<h4 key={genre.id} className='genre'>
									{genre.name}
								</h4>
							))}
					</div>
					{/* <p>{item.tagline && item.tagline}</p> */}
				</div>
				<div className='content-cta'>
					<a
						className='cta trailer'
						href={`https://www.youtube.com/watch?v=${video}`}
						rel='noreferrer'
						target='_blank'
					>
						<TiVideo className='cta-icon' />
						<h2>Official Trailer</h2>
					</a>
					<a
						className='cta link'
						href={
							item.homepage
								? item.homepage
								: `https://www.google.com/search?q=${item.name || item.title}`
						}
						rel='noreferrer'
						target='_blank'
					>
						<AiOutlineLink className='cta-icon' />
						<h2>Official page</h2>
					</a>
					{media_type === "movie" ? (
						storedMovie ? (
							<button
								className='cta wishlist'
								onClick={() => {
									removeFavoriteMovie(item.id)
									document.querySelector("html").style.overflowY = "visible"
								}}
								style={{ color: "#f1b918" }}
							>
								<MdFavorite className='cta-icon' />
								<h2>Already a favorite!</h2>
							</button>
						) : (
							<button
								className='cta wishlist'
								onClick={() => addFavoriteMovie(item)}
							>
								<MdFavoriteBorder className='cta-icon' />
								<h2>Add to Favorites</h2>
							</button>
						)
					) : storedSeries ? (
						<button
							className='cta wishlist'
							onClick={() => {
								removeFavoriteSeries(item.id)
								document.querySelector("html").style.overflowY = "visible"
							}}
							style={{ color: "#f1b918" }}
						>
							<MdFavorite className='cta-icon' />
							<h2>Already a favorite!</h2>
						</button>
					) : (
						<button
							className='cta wishlist'
							onClick={() => addFavoriteSeries(item)}
						>
							<MdFavoriteBorder className='cta-icon' />
							<h2>Add to Favorites</h2>
						</button>
					)}
				</div>
				<div className='overview'>
					<div className='bio-title'>
						<MdInfoOutline className='icon' />
						<h1>Overview</h1>
					</div>
					<p>{item.overview}</p>
				</div>
			</div>
			<CastCarousel media_type={media_type} id={id} />
		</>
	)
}

export default ModalMovies

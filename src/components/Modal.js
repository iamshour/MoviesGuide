import axios from "axios"
import { useEffect, useState } from "react"
//icons
import { VscChromeClose } from "react-icons/vsc"
import { AiOutlineLink } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { TiVideo } from "react-icons/ti";

const Modal = ({ setModalOpened, media_type, id }) => {

	const [singleItem, setSingleItem] = useState({})
	const [video, setVideo] = useState()

	const fetchData = async () => {
		const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
		setSingleItem(data)
		console.log(data)
	}

	const fetchVideo = async () => {
		const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
		setVideo(data.results[0]?.key);
	}

	useEffect(() => {
		fetchData();
		fetchVideo();
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
						<img src={singleItem.backdrop_path ? `https://image.tmdb.org/t/p/w500${singleItem.backdrop_path}` : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"} alt="" />
						<div className="content">
							<div className='title'>
								<h1>{singleItem.title || singleItem.name}</h1>
								<div className='genres-container'>
									{singleItem.genres &&
										singleItem.genres.map((genre) => (
											<h4 key={genre.id} className='genre'>{genre.name}</h4>
										))
									}
								</div>
								
								{/* <p>{singleItem.tagline && singleItem.tagline}</p> */}
								{/* ({(singleItem.release_date || singleItem.first_air_date || '----').substring(0, 4)}) */}
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
								<button className="cta wishlist">
									{/* <MdFavorite className='cta-icon'/> */}
									<MdFavoriteBorder className='cta-icon'/>
									<h2>Add to Favorites</h2>
								</button>
							</div>
							<div className='overview'>
								<p>{singleItem.overview}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Modal

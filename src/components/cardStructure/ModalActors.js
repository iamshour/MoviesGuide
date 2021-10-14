import { useEffect, useState } from "react"
import { img_small, unavailable_modal } from "../conditional/config"
import axios from "axios"
//icons
import { BsFillPersonFill } from "react-icons/bs"
import { FaBirthdayCake, FaCross } from "react-icons/fa"
import { MdHistory, MdPlace } from "react-icons/md"

const ModalActors = ({ id }) => {
	const [item, setItem] = useState({})

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		)
		setItem(data)
		console.log(data)
	}

	useEffect(() => {
		fetchData()
		//eslint-disable-next-line
	}, [])

	return (
		<>
			<div className='actor-top-content'>
				<div className='img-container-2'>
					<img
						src={
							item.profile_path
								? `${img_small}/${item.profile_path}`
								: unavailable_modal
						}
						alt={item.name}
					/>
				</div>
				<div className='top-info'>
					<div className='info-box'>
						<BsFillPersonFill className='info-icon' />
						<h1>Name:</h1>
						<p>{item.name}</p>
					</div>
					<div className='info-box'>
						<MdPlace className='info-icon custom' />
						<h1>Place of birth:</h1>
						<p>{item.place_of_birth}</p>
					</div>
					<div className='info-box'>
						<FaBirthdayCake className='info-icon' />
						<h1>Birthday:</h1>
						<p>{item.birthday}</p>
					</div>
					{item.deathday && (
						<div className='info-box'>
							<FaCross className='info-icon' />
							<h1>Death:</h1>
							<p>{item.deathday}</p>
						</div>
					)}
				</div>
			</div>
			{item.biography && (
				<div className='overview custom-overview'>
					<div className='bio-title'>
						<MdHistory className='icon' />
						<h1>Biography</h1>
					</div>
					<p>{item.biography}</p>
				</div>
			)}
		</>
	)
}

export default ModalActors

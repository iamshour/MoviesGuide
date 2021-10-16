import { useState } from "react"
import Modal from "./Modal"
import { motion } from "framer-motion"
//icons
import { BsFillStarFill } from "react-icons/bs"

const Card = ({ title, image, rating, date, id, media_type }) => {
	const [modalOpened, setModalOpened] = useState(false)

	return (
		<>
			<motion.button
				layout
				className='card'
				onClick={() => {
					setModalOpened(true)
					document.querySelector("html").style.overflowY = "hidden"
					//or use documentElement instead of querySelector
				}}
			>
				<div
					className={`card-rating ${
						rating > 6 ? "good-rating" : rating < 6 ? "bad-rating" : "no-rating"
					}`}
				>
					<BsFillStarFill
						className='rating-icon'
						style={rating === "" && { display: "none" }}
					/>
					<h4>{rating}</h4>
				</div>
				<img src={image} alt={title} />
				<div className='card-info'>
					<h2 className='card-title'>{title}</h2>
					<h3 className='card-date'>
						{media_type === "movie"
							? `Release date: ${date}`
							: media_type === "tv"
							? `First air date: ${date}`
							: null}
					</h3>
				</div>
			</motion.button>
			{modalOpened && (
				<Modal
					id={id}
					media_type={media_type}
					setModalOpened={setModalOpened}
				/>
			)}
		</>
	)
}

export default Card

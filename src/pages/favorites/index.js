import { useContext, useState } from "react"
import { GlobalContext } from "context/GlobalState"
import Card from "components/card"
import { img_small, unavailable_small } from "components/utility"

const Favorites = () => {
	const { favoriteMovies, favoriteSeries } = useContext(GlobalContext)
	const [movieClicked, setMovieClicked] = useState(true)

	return (
		<div className='fav-page'>
			<div className='fav-btns'>
				<button
					className={movieClicked ? "clicked" : "unclicked"}
					onClick={() => (!movieClicked ? setMovieClicked(true) : null)}>
					Favorite Movies
				</button>
				<button
					className={movieClicked ? "unclicked" : "clicked"}
					onClick={() => (movieClicked ? setMovieClicked(false) : null)}>
					Favorite Series
				</button>
			</div>
			<div className='card-container'>
				{movieClicked ? (
					favoriteMovies.length === 0 ? (
						<p className='no-fav'>No Movies liked yet!</p>
					) : (
						favoriteMovies.map((item) => (
							<Card
								key={item.id}
								id={item.id}
								title={item.name || item.title}
								image={
									item.poster_path
										? `${img_small}/${item.poster_path}`
										: unavailable_small
								}
								date={item.first_air_date || item.release_date}
								rating={item.vote_average ? item.vote_average : ""}
								media_type='movie'
							/>
						))
					)
				) : favoriteSeries.length === 0 ? (
					<p className='no-fav'>No Series liked yet!</p>
				) : (
					favoriteSeries.map((item) => (
						<Card
							key={item.id}
							id={item.id}
							title={item.name || item.title}
							image={
								item.poster_path ? `${img_small}/${item.poster_path}` : unavailable_small
							}
							date={item.first_air_date || item.release_date}
							rating={item.vote_average ? item.vote_average : ""}
							media_type='tv'
						/>
					))
				)}
			</div>
		</div>
	)
}

export default Favorites

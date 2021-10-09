import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/GlobalState"
// Comps
import Loading from "../components/Loading"
import Card from "../components/Card"
import { img_small, unavailable_small } from '../components/config'

const ItemTab = () => {
	const { showItems, getPopularItems, loading, location } =
		useContext(GlobalContext)

	const media_type = `${
		location === 0 ? "movie" : location === 1 ? "tv" : null
	}`

	useEffect(() => {
		getPopularItems(media_type)
		// eslint-disable-next-line
	}, [location])

	return (
		<>
			{showItems && (
				<>
					{loading ? (
						<Loading />
					) : (
						<div className='card-container card-container-custom'>
							{showItems.map((item) => (
								<Card
									key={item.id}
									id={item.id}
									title={item.name || item.title}
									image={item.poster_path ? `${img_small}/${item.poster_path}` : unavailable_small}
									date={item.first_air_date || item.release_date}
									rating={item.vote_average ? item.vote_average : ""}
									media_type={media_type}
								/>
							))}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default ItemTab

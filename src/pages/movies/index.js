import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "context/GlobalState"
// Comps
import Card from "components/card"
import Loading from "components/fragments/Loading"
import { img_small, unavailable_small } from "components/utility"
import CustomPagination from "components/fragments/CustomPagination"

const Movies = () => {
	const { showItems, getPopularItems, loading, location, numOfPages } =
		useContext(GlobalContext)

	const [page, setPage] = useState(1)

	useEffect(() => {
		getPopularItems("movie", page)
		// eslint-disable-next-line
	}, [location, page])

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
									title={item.title}
									image={
										item.poster_path
											? `${img_small}${item.poster_path}`
											: unavailable_small
									}
									date={item.release_date}
									rating={item.vote_average ? item.vote_average : ""}
									media_type='movie'
								/>
							))}
						</div>
					)}
					{numOfPages > 1 && <CustomPagination setPage={setPage} />}
				</>
			)}
		</>
	)
}

export default Movies

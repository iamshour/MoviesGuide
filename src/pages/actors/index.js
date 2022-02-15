import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "context/GlobalState"
// Comps
import Loading from "components/fragments/Loading"
import Card from "components/card"
import { img_small, unavailable_small } from "components/utility"
import CustomPagination from "components/fragments/CustomPagination"

const Actors = () => {
	const { showItems, getActors, loading, location, numOfPages } =
		useContext(GlobalContext)

	const [page, setPage] = useState(1)

	useEffect(() => {
		getActors(page)
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
									title={item.name}
									key={item.id}
									id={item.id}
									image={
										item.profile_path
											? `${img_small}${item.profile_path}`
											: unavailable_small
									}
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

export default Actors

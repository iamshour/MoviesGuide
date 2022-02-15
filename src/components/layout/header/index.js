import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "context/GlobalState"

const Header = () => {
	const { getPopularItems, location, getActors } = useContext(GlobalContext)

	return (
		<header>
			<Link
				to={
					location === 0
						? "/"
						: location === 1
						? "/series"
						: location === 2
						? "/actors"
						: location === 3
						? "/favorites"
						: null
				}
				onClick={() => {
					if (location === 0) {
						getPopularItems("movie", 1)
					} else if (location === 1) {
						getPopularItems("tv", 1)
					} else if (location === 2) {
						getActors(1)
					}
				}}>
				<img
					src='https://res.cloudinary.com/dniaqkd0y/image/upload/v1644935577/moviesguide-logo_hiugir.png'
					alt='MoviesGuide app Logo'
				/>
			</Link>
		</header>
	)
}

export default Header

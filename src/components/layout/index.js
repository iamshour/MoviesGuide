import { useContext } from "react"
import { GlobalContext } from "context/GlobalState"
import Navbar from "./navbar"
import Header from "./header"
import SearchComp from "components/searchComp"

const Layout = ({ children }) => {
	const { location, headline } = useContext(GlobalContext)

	return (
		<>
			<Header />
			{location === 0 || location === 1 || location === 2 ? <SearchComp /> : null}
			<div className='headline'>
				<h1>
					{location === 0 || location === 1 || location === 2
						? headline
						: "Your Favorite Picks!"}
				</h1>
			</div>
			{children}
			<Navbar />
		</>
	)
}

export default Layout

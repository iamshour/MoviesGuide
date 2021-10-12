import { useContext, useState } from "react"
import { motion } from "framer-motion" 
//comps
import Alert from "../conditional/Alert"
//icons
import { BsSearch } from "react-icons/bs"
import { VscChromeClose } from "react-icons/vsc"
import { GlobalContext } from "../../context/GlobalState"

const SearchComponent = () => {
	const { alert, setAlert, getSearchResults, location } =
		useContext(GlobalContext)
	const [searchClicked, setSearchClicked] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")

	const submit = (e) => {
		e.preventDefault()

		if (searchTerm === "") {
			setAlert("please enter something", "danger")
		} else {
			if (location === 0) {
				getSearchResults(searchTerm, "movie")
			} else if (location === 1) {
				getSearchResults(searchTerm, "tv")
			}
			setSearchTerm("")

			//mobile keyboard
			document.getElementById("input").inputMode = "none"
			setTimeout(() => {
				document.getElementById("input").inputMode = "text"
			}, 50)
		}
	}

	return (
		<div className='search-container'>
			<button
				className='switching-btn'
				onClick={() => {
					setSearchClicked(!searchClicked)
				}}
				style={
					!searchClicked
						? {
								color: "#9888f9",
								background: "#f2f2f2",
								border: "1px solid #9888f9",
						  }
						: {
								color: "#f2f2f2",
								background: "#C8970C",
								border: "1px solid #7d5f08",
						  }
				}
			>
				{searchClicked ? (
					<VscChromeClose className='icon' />
				) : (
					<BsSearch className='icon' />
				)}
			</button>
			{searchClicked && (
				<>
					{alert && <Alert type={alert.type} message={alert.message} />}
					<form
						onSubmit={submit}
					>
						<motion.input
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							type='text'
							id='input'
							placeholder={
								location === 0 ? "Search for a movie" : "Search for a series"
							}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<motion.button
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
						>
							Search
						</motion.button>
					</form>
				</>
			)}
		</div>
	)
}

export default SearchComponent

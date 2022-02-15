import { useContext } from "react"
import { GlobalContext } from "context/GlobalState"
import Pagination from "@mui/material/Pagination"

const CustomPagination = ({ setPage }) => {
	const { numOfPages } = useContext(GlobalContext)

	return (
		<Pagination
			className='pagination'
			count={numOfPages}
			onChange={(e) => {
				setPage(e.target.textContent)
				window.scroll(0, 0)
			}}
			shape='circular'
			hideNextButton
			hidePrevButton
		/>
	)
}

export default CustomPagination

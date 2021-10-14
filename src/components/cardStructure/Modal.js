import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
//comps
import ModalMovies from "./ModalMovies"
import ModalActors from "./ModalActors"
//icons
import { VscChromeClose } from "react-icons/vsc"

const Modal = ({ setModalOpened, media_type, id }) => {
	const { location } = useContext(GlobalContext)

	const closeModal = (e) => {
		if (e.target.classList.contains("backdrop")) {
			setModalOpened(false)
			document.querySelector("html").style.overflowY = "visible"
		}
	}

	return (
		<div className='backdrop' onClick={closeModal}>
			<div className='modal'>
				<button
					className='close-modal'
					onClick={() => {
						setModalOpened(false)
						document.querySelector("html").style.overflowY = "visible"
					}}
				>
					<VscChromeClose className='close-icon' />
				</button>
				{location !== 2 ? (
					<ModalMovies media_type={media_type} id={id} />
				) : location === 2 ? (
					<ModalActors media_type={media_type} id={id} />
				) : null}
			</div>
		</div>
	)
}

export default Modal

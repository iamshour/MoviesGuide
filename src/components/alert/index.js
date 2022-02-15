import { IoAlertCircleOutline } from "react-icons/io5"

const Alert = ({ type, message }) => {
	return (
		<div className={`alert alert-${type}`}>
			<IoAlertCircleOutline className='alert-icon' />
			<p>{message}</p>
		</div>
	)
}

export default Alert

import Ripple from '../images/Ripple.svg'

const Loading = () => {
    return (
        <div className='loading-container'>
            <img 
                src={Ripple}
                alt='loading...'
                className='loading'
            />
        </div>
    )
}

export default Loading

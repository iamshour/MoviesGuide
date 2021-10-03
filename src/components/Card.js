import { BsFillStarFill } from "react-icons/bs";

const Card = ({title, image, rating, date }) => {
    return (
        <div className='card'>
            <div className={`card-rating ${rating > 6 ? 'good-rating' : rating < 6 ? 'bad-rating' : 'no-rating'}`}>
                <BsFillStarFill className='rating-icon' style={rating === '' && {display: 'none'}}/>
                <h4>{rating}</h4>
            </div>
            <img src={image} alt={title} />
            <div className="card-info">
                <h2 className='card-title'>{title}</h2>
                <h3 className='card-date'>{date}</h3>
            </div>
        </div>
    )
}

export default Card

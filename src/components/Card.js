import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = ({title, image, rating, date, id, media_type }) => {
    return (
        <Link to={`/${id}`} className='card'>
            <div className={`card-rating ${rating > 6 ? 'good-rating' : rating < 6 ? 'bad-rating' : 'no-rating'}`}>
                <BsFillStarFill className='rating-icon' style={rating === '' && {display: 'none'}}/>
                <h4>{rating}</h4>
            </div>
            <img src={image} alt={title} />
            <div className="card-info">
                <h2 className='card-title'>{title}</h2>
                <h3 className='card-date'>{media_type === 'movie' ? `Release date: ${date}` : media_type === 'tv' ? `First air date: ${date}` : null}</h3>
            </div>
        </Link>
    )
}

export default Card

import axios from "axios";
import { useEffect, useState } from "react";
import { img_small, unavailable_carousel } from './config'

const CastCarousel = ({media_type, id}) => {

    const [credits, setCredits] = useState();

    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data);
        console.log(data)
      };
    
      useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
      }, []);

    return (
        <div className='carousel-container'>
            <div className="carousel">
                { credits && 
                    credits.cast.map(item => (
                        <div key={item.id} className='single-cast'>
                            <img src={item.profile_path ? `${img_small}/${item.profile_path}` : unavailable_carousel} alt={item?.name} />
                            <h3>{item?.name}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CastCarousel

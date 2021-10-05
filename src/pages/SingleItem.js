import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/GlobalState"


const SingleItem = ({ match }) => {

    const {singleItem, getSingleItem, loading, location} = useContext(GlobalContext);

    const media_type = `${location === 0 ? 'movie' : location === 1 ? 'tv' : null}`

    useEffect(() => {
        getSingleItem( media_type, match.params.id);

        //eslint-disable-next-line
    }, [])

    console.log(singleItem)

    return (
        <div>
            {singleItem &&
                <h1>{singleItem.name || singleItem.title}</h1>
            }
        </div>
    )
}

export default SingleItem

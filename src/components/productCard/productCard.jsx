import './productCard.css'

function productCard ({id ,title , imgSrc , price , buyAction}) {
    return (
        <div id={id} className={"productCard"}>
            <div className={"img-div"}>
                <img src={imgSrc} alt={title + "Image"}/>
            </div>
            <div className={"info"}>
                <span>{title}</span>
                <span>{price} $</span>
                <button onClick={() => {buyAction(id)}}>Add to basket</button>
            </div>
        </div>
    )
}

export default productCard
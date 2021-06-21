import './basketCard.css'

function BasketCard({id , name , img , amount , price , deleteaction}) {
    return (
        <div id={`basket-card-${id}`} className={"basket-card"}>
            <div className={"basket-card-img"}>
                 <img src={img} alt={name}/>
            </div>
            <div className={"basket-card-info"}>
                <h2>{name}</h2>
                <h4>{price} $</h4>
            </div>
            <div className={"basket-card-action"}>
                <p>amount = {amount}</p>
                <button onClick={() => deleteaction(id)}>delete</button>
            </div>

        </div>
    )
}

export default BasketCard
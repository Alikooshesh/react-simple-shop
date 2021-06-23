import './billingform.css'

function checkout(){
    alert("saved")
}

function BillingForm({billingFormShow , setBillingFormShow , setBasketData}){
    if (billingFormShow == true){
        return (
            <div className={"w-100 d-flex flex-column justify-content-around align-items-center"}>
                <label htmlFor={"email-inp"}>Email</label>
                <input type="email" id={"email-inp"} className={"w-100"} required/>

                <label htmlFor={"name-inp"}>Name</label>
                <input type="text" id={"name-inp"} className={"w-100"}/>

                <label htmlFor={"address-inp"}>Address</label>
                <input type="text" id={"address-inp"} className={"w-100"}/>

                <button className={"w-100 bg-warning"} onClick={checkout}>Checkout</button>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default BillingForm
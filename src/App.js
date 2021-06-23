import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {useState , useEffect} from 'react'
import Header from './components/header/header'
import Selector from './components/selector/selector'
import ProductCard from './components/productCard/productCard'
import BasketCard from "./components/basketCard/basketCard";
import BillingForm from "./components/billingForm/billingForm"
import {productList} from './data/productData'
import {logDOM} from "@testing-library/react";


function App() {
    const [filteredProductData , setFilteredProductData] = useState(productList)
    const [basketDataState , setBasketData] = useState([])
    const [totalPrice , setTotalPrice] = useState(0)

    const [filters , setFilters] = useState({})

    const [billingFormShow , setBillingFormShow] = useState(false)

    useEffect(async ()=>{
        await setFilteredProductData([...productList])

        if (filters["size_selector"] && filters["size_selector"] != "All"){
            setFilteredProductData([...productList.filter(item =>
                item.size == filters["size_selector"]
            )])
        }

        if (filters["price_selector"] && filters["price_selector"] != "All"){
            if (filters["price_selector"] != "Highest"){
                setFilteredProductData([...filteredProductData.sort((item,item2) => item.price - item2.price)])

            }
            else {
                setFilteredProductData([...filteredProductData.sort((item,item2) => item2.price - item.price)])
            }
        }

        console.log(filteredProductData)
    },[filters])


    useEffect(()=> {setTotalPrice(totalPriceCalc())}, [basketDataState])

    function updateBasket(id,action) {
        const finder = basketDataState.find(item => item.id == id)
        console.log(`finder : ${finder}`)

        if (finder == undefined){
            if (action == 1){
                const newBasketCard = productList.find(item => item.id == id)
                newBasketCard.amount = 1
                console.log(newBasketCard)

                setBasketData([...basketDataState , newBasketCard])
                console.log(basketDataState)
            }
        }else {
            if (action == 1){
                const basketDataState_copy = [...basketDataState]
                basketDataState_copy.map(item => {
                    if (item.id == id){
                        item.amount += 1
                        console.log(item.amount)
                    }
                })

                setBasketData([...basketDataState_copy])
            }else{
                setBasketData(basketDataState.filter(item => item.id != id))
            }
        }
        setTotalPrice(totalPriceCalc())
    }

    function addToBasket(id) {
        updateBasket(id,1)
    }

    function delFromBasket(id) {
        updateBasket(id,-1)
    }

    function totalPriceCalc() {
        return basketDataState.reduce((_totalPrice , current) => _totalPrice + (current.price * current.amount) , 0)
    }

    function openProceed() {
        setBillingFormShow(true)
    }

  return (

      <div>
          {console.log(filters)}
        <Header title={"React Shoping Cart"}></Header>
        <main>
            <div className={"top-main"}>
                <div className={"filters"}>
                    <span>Products : {filteredProductData.length}</span>
                    <Selector key={"price_selector"} name={"price_selector"} id={"price_selector"} lable={"Price Filter : "} options={["All" , "Highest" , "Lowest"]} filters={filters} setFilters={setFilters}></Selector>
                    <Selector key={"size_selector"} name={"size_selector"} id={"size_selector"} lable={"Size Filter : "} options={["All" , "S" , "L" , "XL" , "XXL"]} filters={filters} setFilters={setFilters}></Selector>
                </div>
                <div className={"basket-header"}>
                    <span>Basket</span>
                </div>


            </div>
            <div className={"main"}>
                <div className={"products"}>
                    {filteredProductData.map(item => {
                        return (
                            <ProductCard key={item.id} id={item.id} title={item.title} imgSrc={item.img} price={item.price} buyAction={addToBasket}></ProductCard>
                        )
                    })}
                </div>
                <div className={"basket"}>
                    {
                        basketDataState.map(item => {
                        return(
                            <BasketCard key={'basket' + item.id} id={item.id} img={item.img} price={item.price} name={item.title} amount={item.amount} deleteaction={delFromBasket}></BasketCard>
                        )
                    })}
                    <div className={"d-flex"}>
                        Total= {totalPrice} $
                        <button onClick={openProceed}>Proceed</button>
                    </div>

                    <BillingForm key={'billingForm'} billingFormShow={billingFormShow} setBillingFormShow={setBillingFormShow} setBasketData={setBasketData}></BillingForm>

                </div>
            </div>
        </main>
      </div>

  )
}

export default App;

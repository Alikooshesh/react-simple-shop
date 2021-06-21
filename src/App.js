import './App.css';
import {useState} from 'react'
import Header from './components/header/header'
import Selector from './components/selector/selector'
import ProductCard from './components/productCard/productCard'
import {productList} from './data/productData'
import {basketData} from "./data/basketData";
import {logDOM} from "@testing-library/react";

function App() {
    const [filteredProductData , setFilteredProductData] = useState(productList)
    const [basketDataState , setBasketData] = useState(basketData)

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

    }

    function addToBasket(id) {
        updateBasket(id,1)
    }

    function delFromBasket(id) {
        updateBasket(id,-1)
    }

  return (
      <div>
        <Header title={"React Shoping Cart"}></Header>
        <main>
            <div className={"top-main"}>
                <div className={"filters"}>
                    <span>Products : {filteredProductData.length}</span>
                    <Selector key={"price_selector"} id={"price_selector"} lable={"Price Filter : "} options={["All" , "Highest" , "Lowest"]} startValue={"All"}></Selector>
                    <Selector key={"price_selector"} id={"size_selector"} lable={"Size Filter : "} options={["All" , "S" , "L" , "XL" , "XXL"]} startValue={"All"}></Selector>
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

                </div>
            </div>
        </main>
      </div>

  )
}

export default App;

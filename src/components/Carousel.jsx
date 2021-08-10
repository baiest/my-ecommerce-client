import React, { useState, useEffect } from 'react'
import '../assets/css/Carousel.css'
import ProductCard from './ProductCard'
const Carousel = (props) => {
    const [check, setCheck] = useState(0)
    const [carousel, setCarousel] = useState(null)
    //const TIME_TRANSITION = 2000
    const cards = props.data
    
    const moveSlider = (dir) => {
        if (check >= cards.length - 1 || check < 0){
            setCheck(0)
        }else{
            setCheck(check + dir)
        }
    }
    /*const observer = new IntersectionObserver(async entries => {
        const intersect = entries[0]
        if(intersect.isIntersecting){
            setTime(setTimeout(moveSlider, TIME_TRANSITION))
        }
    })*/
    useEffect(() => {
        if(carousel){
            carousel.scrollLeft = check * 200
        }else{
            setCarousel(document.getElementById(props.id))
        }
       // observer.observe(carousel)
    }, [carousel, check, props.id])
    return(
        <div id={props.id} className="carousel">
            <button className="control back" onClick={() => {
                moveSlider(-1)
                }}></button>
            {
                cards.map((p, key) => {
                    return(
                        <React.Fragment key={key}>
                            <input id={`card-${p.product_id}`} type="radio" name="card" defaultChecked={check === key}/>
                            <label htmlFor={`card-${p.product_id}`} className="card">
                                <ProductCard 
                                    id={p.product_id}
                                    name={p.product_name}
                                    price={p.product_price}/>
                            </label>
                        </React.Fragment>
                        )
                    })
                }
            <button className="control next" onClick={() => {
                moveSlider(1)
                }}></button>

        </div>
    )
}

export default Carousel
import React from 'react'
import {URL} from '../providers/api'
import '../assets/css/ProductCard.css'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    const handleCard = () => {
        console.log('oprimida carta')
    }
    return <Link to={`/product/${props.id}`} className="product__card" onClick={handleCard}>
        <img src={`${URL.api}products/img/${props.id}/1`} alt={`Product ${props.id}`} />
        <div className="product__card-body">
            <h3 className="product__card-name">
                {props.name.length < 30 ? props.name : `${props.name.slice(0, 30)}...`}
            </h3>
            <span className="product__card-price">${props.price}</span>
        </div>
    </Link>
}

export default ProductCard
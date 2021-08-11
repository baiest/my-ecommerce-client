import React from 'react'
import { API_PRODUCT_IMAGE } from '../providers/api'
import '../assets/css/ProductCard.css'
import { Link } from 'react-router-dom'
import {numberFormat} from'../utils.js'

const ProductCard = (props) => {
    return <Link to={`/product/${props.id}`} className="product__card">
        <img src={API_PRODUCT_IMAGE(props.id)} alt={`Product ${props.id}`} />
        <div className="product__card-body">
            <h3 className="product__card-name">
                {props.name.length < 30 ? props.name : `${props.name.slice(0, 30)}...`}
            </h3>
            <span className="product__card-price">{numberFormat.format(props.price)}</span>
        </div>
    </Link>
}

export default ProductCard
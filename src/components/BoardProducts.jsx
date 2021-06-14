import React from 'react'
import { URL }from '../providers/api'
import axios from 'axios'

import '../assets/css/BoardProducts.css'

import ProductCard from './ProductCard'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            loading: true,
            error: ''
        }
    }

    async componentDidMount(){
        try{
            const response = await axios(URL.api + 'products')
            this.setState({products: response.data, loading: false})
        }catch(error){
            this.setState({error: 'Ah ocurrido un error', loading: false})
        }
    }
    
    render(){
        if (this.state.error)
        {
            return <span>{this.state.error}</span>
        } 
        if (this.state.loading)
        {
            return <div className="loader"></div>            
        } 
        return  (
        <ul className="products">
            {this.state.products?.map(p => (
                <li key={p.product_id}>
                    <ProductCard 
                    id={p.product_id}
                    name={p.product_name}
                    price={p.product_price}/>
                </li>
                ))}
        </ul>
        )
    }
}

export default Main
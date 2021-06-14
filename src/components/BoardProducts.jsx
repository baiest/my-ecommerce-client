import React from 'react'
import { URL }from '../providers/api'
import axios from 'axios'

import '../assets/css/BoardProducts.css'

import ProductCard from './ProductCard'
import Error from './general/Error'

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
            const response = await axios(URL.api + this.props.products_url)
            this.setState({products: response.data, loading: false})
        }catch(error){
            this.setState({error: error.message, loading: false})
        }
    }
    
    render(){
        if (this.state.error)
        {
            return <Error message={this.state.error}/>
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
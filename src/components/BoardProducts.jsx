import React from 'react'
import { API_PRODUCTS_CATEGORY, API_PRODUCTS }from '../providers/api'
import axios from 'axios'

import '../assets/css/BoardProducts.css'

import ProductCard from './ProductCard'
import Error from './general/Error'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products_url: this.props.products_url ? 
            API_PRODUCTS_CATEGORY(this.props.products_url) :
            API_PRODUCTS,
            products: [],
            loading: true,
            error: ''
        }
        this.source = axios.CancelToken.source();
        this.get_products = this.get_products.bind(this)
    }

    componentDidMount(){
        this.get_products()
    }

    componentWillUnmount(){
        if (this.source) {
            this.source.cancel();
        }
    }

    async get_products(){
        try{
            const response = await axios(this.state.products_url, {
                cancelToken: this.source.token
            })
            this.setState({products: response.data, loading: false})
        }catch(error){
            if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
                this.setState({error: error.response?.data.error || error.message, loading: false})
            }
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
        if (this.state.products.length === 0){
            return <h4>No hay productos</h4>
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
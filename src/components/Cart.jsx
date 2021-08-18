import React from 'react' 
import axios from 'axios'
import { API_USER_CART } from './../providers/api';
import ProductCard from './ProductCard';
import '../assets/css/Cart.css'

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            loading: true,
            error: ''
        }

        this.source = axios.CancelToken.source();
    }

    async componentDidMount() {
        try{
            const response = await axios.get(API_USER_CART, {
                cancelToken: this.source.token,
                headers: {
                    token: this.props.cookie
                }
            })
            this.setState({products: response.data, loading: false})
        }catch(error){
            if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
                this.setState({error: error.response?.data.error || error.message, loading: false})
            }
        }
    }
    
    componentWillUnmount(){
        if (this.source) {
            this.source.cancel();
        }
    }
    
    cash = () => {
        return this.state.products.map(p => p.product_price).reduce((acc, price) => price + acc).toFixed(2)
    }
    render(){
        if (this.state.loading) {
            return <div className='loader'></div>
        } 
        if (this.state.error) {
            return this.state.error
        } 
        return <ul className='cart'>
        <div className='cart__pay'>
            <h3>Total a pagar: <strong>{this.cash()}</strong></h3>
            <button>Continuar con el pago</button>
        </div>
        {
            this.state.products?.map(p => <li key={p.product_id} className="cart__product">
                <ProductCard   
                id={p.product_id}
                name={p.product_name}
                price={p.product_price}/>
                <span className="cart__delete" onClick={() => console.log('hola')}>X</span>
                </li>
                )
        }
        </ul>
    }
}

export default Cart
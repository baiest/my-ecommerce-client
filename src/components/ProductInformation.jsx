import React from 'react' 
import axios from 'axios'
import Error from './general/Error'
import {URL} from '../providers/api'
class ProductInformation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            product: {},
            loading: false,
            error: ''
        }
    }
    
    async componentDidMount(){
        try{
            const response = await axios(URL.api + `products/${this.props.product_id}`)
            this.setState({product: response.data, loading: false})
            console.log(this.state.product)
        }catch(error){
            this.setState({error: error.message, loading: false})
        }
    }
    render(){
        if (this.state.loading){
            return <div className="loader"></div>
        }
        if (this.state.error){
            return <Error message={this.state.error}/>
        }
        
        return <section>
                <p>carrusel</p>
                <h2>{this.state.product.product_name}</h2>
            </section>
    }
}

export default ProductInformation
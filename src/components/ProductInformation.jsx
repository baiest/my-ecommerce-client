import React from 'react' 
import axios from 'axios'
import Error from './general/Error'
import {API_PRODUCT_ID, API_PRODUCT_IMAGE } from '../providers/api'
import Button from './general/Button'
import '../assets/css/ProductInformation.css'
class ProductInformation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            product: {},
            loading: true,
            error: '',
            image: '',
            checked: true
        }
        this.source = axios.CancelToken.source();
        this.changeImage = this.changeImage.bind(this)
    }
    
    async componentDidMount(){
        try{
            const response = await axios(API_PRODUCT_ID(this.props.product_id), {
                    cancelToken: this.source.token
                })

            this.setState({
                product: response.data,
                image: API_PRODUCT_IMAGE(response.data.product_id, response.data.images[0]),
                loading: false})
        }catch(error){
            if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
                this.setState({error: error.message, loading: false})
            }
        }
    }

    componentWillUnmount(){
        if (this.source) {
            this.source.cancel();
        }
    }

    changeImage(dir_image){
        this.setState({ image: dir_image })
    }

    images_product = () => {
        const{ product } = this.state
        return <div className='product__images-mini'>
        {
            this.state.product.images?.map( (image, key) => (
                <React.Fragment key={key} >
                    <input type="radio" 
                    onChange={() => this.changeImage(API_PRODUCT_IMAGE(product.product_id, image))} 
                    id={`product${image}`} 
                    name="product" 
                    value={product.product_id} 
                    defaultChecked={key === 0}
                    />
                    <label className='product__mini' htmlFor={`product${image}`}>
                        <img src={API_PRODUCT_IMAGE(product.product_id, image)} alt=""/>
                    </label>
                </React.Fragment>
            ))
        }
        </div>
    }
    
    render(){

        if (this.state.loading){
            return <div className="loader"></div>
        }
        if (this.state.error){
            return <Error message={this.state.error}/>
        }
        
        const { product } = this.state
        const  numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        return <section className="container">
                <div className="product__main">
                    <div className="product__images">
                        {this.images_product()}
                        <img src={this.state.image} alt="" />
                    </div>
                    <div className="product__information">
                        <h2>{product.product_name}</h2>
                        <p>{numberFormat.format(product.product_price)}</p>
                        <Button className="btn-green" text="Comprar" bg="green" color="#fff"/>
                        <Button className="btn-blue" text="Agregar al carrito"/>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut temporibus cupiditate obcaecati nostrum quasi perferendis, eligendi aliquid ex veniam necessitatibus accusantium est? Maiores debitis eius reiciendis ipsum sequi id.</p>
            </section>
    }
}

export default ProductInformation
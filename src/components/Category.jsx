import React from 'react' 
import {URL} from '../providers/api'
import axios from 'axios'
import Error from './general/Error'
import { Link } from 'react-router-dom'
import '../assets/css/Category.css'
class Category extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            categories: [],
            loading: true,
            error: ''
        }
        this.cancelTokenSource = axios.CancelToken.source();
        this.normalizaRoute = this.normalizaRoute.bind(this)
    }

    async componentDidMount(){
        try{
            const response = await axios(URL.api + 'categories')
            this.setState({categories: response.data, loading: false})
            
            const category_routes = []
            for(let category of response.data){
                category_routes.push({
                    route_id: category.category_id,
                    route_name: this.normalizaRoute(category.category_name)})
            }
            this.props.category_selected(category_routes)
        }catch(error){
            this.setState({error: error.message, loading: false})
        }
    }

    normalizaRoute(route){
        return route.toLowerCase().replace(' ', ',')
    }

    componentWillUnmount(){
        this.cancelTokenSource.cancel()
    }

    categories() {
        if (this.state.error){
            return <Error message={this.state.error}/>
        }
        return (
            <ul className="category__options">
                {this.state.categories.map(c => (
                <Link key={c.category_id}  className="category__item" to={`/category/${this.normalizaRoute(c.category_name)}`}>
                    <li>{c.category_name}</li>
                </Link>
                ))}
            </ul>
        )
    }

    render(){
        return (
            <section className="category">
                <h2 className="category__hero">{this.props.ecommerce_name}</h2>
                {this.categories()}
            </section>
        )
    }

}

export default Category
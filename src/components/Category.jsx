import React from 'react' 
import { API_CATEGORIES } from '../providers/api'
import axios from 'axios'
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
        this.source = axios.CancelToken.source();
        this.normalizaRoute = this.normalizaRoute.bind(this)
    }

    async componentDidMount(){
        try{
            const response = await axios(API_CATEGORIES,  {
                cancelToken: this.source.token
            })
            this.setState({categories: response.data, loading: false})
            
            const category_routes = []
            for(let category of response.data){
                category_routes.push({
                    route_id: category.category_id,
                    route_name: this.normalizaRoute(category.category_name)})
            }
            this.props.category_selected(category_routes)
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

    normalizaRoute(route){
        return route.toLowerCase().replace(' ', ',')
    }

    categories() {
        return (
            <ul className="category__options">
                {this.state.categories?.map(c => (
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
                {this.categories()}
            </section>
        )
    }

}

export default Category
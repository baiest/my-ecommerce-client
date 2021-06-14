import React from 'react' 
import {URL} from '../providers/api'
import axios from 'axios'
import Error from './general/Error'

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
    }

    async componentDidMount(){
        try{
            const response = await axios(URL.api + 'categories')
            this.setState({categories: response.data, loading: false})
        }catch(error){
            this.setState({error: error.message, loading: false})
        }
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
                    <li key={c.category_id} className="category__item">{c.category_name}</li>
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
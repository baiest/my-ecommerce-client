import React from 'react'
import '../assets/css/Search.css'
class Search extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div id={this.props.id} className={`${this.props.className} container`}>
            <input id="search" type="text" placeholder="Buscar..." />
            <button>buscar</button>
            <label htmlFor="search" className="search__label-out">Buscar</label>
        </div>   
        )
    }
}

export default Search
import '../assets/css/App.css'
import React from 'react'
import data_ecommerce from '../data_ecommerce.json'
import Navbar from './Navbar'
import Main from './Main'
import Search from './Search'
import {Route, Switch} from 'react-router-dom'
import ProductInformation from './ProductInformation'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: data_ecommerce.name,
      user: {
        name: 'User',
        lastname: '',
      },
      routes: [], //ARREGLO DE RUTAS PARA SEPARAR PRODUCTOS POR CATEGORIA
    }
    this.handleCategory = this.handleCategory.bind(this)  
    this.buttonSearch = this.buttonSearch.bind(this)  
  }
  
  handleCategory(category_routes){
    this.setState({routes: category_routes}) //LAS RUTAS ESTAN COMPUESTAS POR route_id Y route_name
  }

  buttonSearch(){
    let search = document.getElementById('section__search')
    if(search.classList.contains('hidden')){
      search.classList.remove('hidden')
      search.classList.add('search')
    }else{
      search.classList.add('hidden')
      search.classList.remove('search')
    }
    console.log(search)
  }
  render() {
    const {name, lastname} = this.state.user
    return (
      <div className="app">
        <Navbar 
        ecommerce_name={this.state.name} 
        name={name} 
        lastname={lastname}
        category_selected={this.handleCategory}
        handleSearch={this.buttonSearch}/>
        <Search id="section__search" className="hidden"/>
        <Switch>
            <Route exact path={['/', '/category/:name_category']} render={() => <Main routes={this.state.routes}/>
              } />
            <Route exact path='/product/:id' render={({match}) =>  <ProductInformation product_id={match.params.id} />} />)
        </Switch>
      </div>
    )
  }
}

export default App;

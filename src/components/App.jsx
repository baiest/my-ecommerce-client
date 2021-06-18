import '../assets/css/App.css'
import React from 'react'
import data_ecommerce from '../data_ecommerce.json'
import Navbar from './Navbar'
import Main from './Main'
import Category from './Category'
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
  }
  
  handleCategory(category_routes){
    this.setState({routes: category_routes}) //LAS RUTAS ESTAN COMPUESTAS POR route_id Y route_name
  }
  render() {
    const {name, lastname} = this.state.user
    return (
      <div className="app">
        <Navbar ecommerce_name={this.state.name} name={name} lastname={lastname}/>
        <Switch>
            <Route exact path={['/', '/category/:name_category']} render={() =>  
              <React.Fragment>
                <Category ecommerce_name={this.state.name} category_selected= {this.handleCategory}/>
                <div className="container">
                  <Main routes={this.state.routes}/>
                </div>
              </React.Fragment>
              } />
            <Route exact path='/product/:id' render={({match}) =>  <ProductInformation product_id={match.params.id} />} />)
        </Switch>
      </div>
    )
  }
}

export default App;

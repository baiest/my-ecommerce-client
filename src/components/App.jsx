import '../assets/css/App.css'
import React from 'react'
import data_ecommerce from '../data_ecommerce.json'
import Navbar from './Navbar'
import Footer from './Footer'
import Main from './Main'
import Login from './Login'
import Search from './Search'
import Cart from './Cart'
import ProductInformation from './ProductInformation'
import PrivateRoute from './general/PrivateRoute'

import {Route, Switch} from 'react-router-dom'
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from 'prop-types';
import axios from 'axios'
import { API_AUTH } from '../providers/api.js'

class App extends React.Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      name: data_ecommerce.name,
      user: {
        name: 'Ingresa',
        lastname: '',
      },
      cartCount: 0,
      routes: [], //ARREGLO DE RUTAS PARA SEPARAR PRODUCTOS POR CATEGORIA
    }
    this.handleCategory = this.handleCategory.bind(this)  
    this.buttonSearch = this.buttonSearch.bind(this)  
    this.createCookie = this.createCookie.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  
  async componentDidMount(){
    console.log('cargado')
    const { cookies } = this.props
    const token = cookies.get('token')
    if(token){
      try{
          const response = await axios.post(
            API_AUTH, 
            {},
            {
              headers:{
                token
              }
            }
          )
          this.setState({
            user:{
              name: response.data.user_name,
              lastname: response.data.user_lastname
            },
            cartCount: response.data.cart
          })
      }catch(error){
          if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
              this.setState({error: error.response?.data.error || error.message, loading: false, user_password: ''})
          }
      }
    }
  }

  createCookie(token){
    const { cookies } = this.props
    if(!cookies.get('token')){
      cookies.set("token", token, { path: "/" , sameSite: true, secure: true})
    }
  }

  logOut(){
    const { cookies } = this.props
    cookies.remove('token')
    window.location.reload()
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
        handleSearch={this.buttonSearch}
        cookie={this.props.cookies.get('token')}
        cartCount={this.state.cartCount !== 0 && this.state.cartCount}
        logOut={this.logOut}/>
        <Search id="section__search" className="hidden"/>
        <Switch>
            <Route exact path={['/', '/category/:name_category']} render={() => <Main routes={this.state.routes}/>
              } />
            <Route exact path='/login' render={() => <Login createCookie={this.createCookie} cookie={this.props.cookies.get('token')}/>}/>
            <PrivateRoute exact path='/client/cart' token={this.props.cookies.get('token')} render={() => <Cart cookie={this.props.cookies.get('token')}/>}/>
            <Route exact path='/product/:id' render={({match}) =>  <ProductInformation product_id={match.params.id} />} />)
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withCookies(App);

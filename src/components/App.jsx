import '../assets/css/App.css'
import React from 'react'
import data_ecommerce from '../data_ecommerce.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: data_ecommerce.name,
      user: {
        name: 'User',
        lastname: ''
      }
    }
  }
  
  render() {
    const {name, lastname} = this.state.user
    return (
      <div>
        <Navbar ecommerce_name={this.state.name} name={name} lastname={lastname}/>
        <div className="container">
          <Main />
        </div>
      </div>
    )
  }
}

export default App;

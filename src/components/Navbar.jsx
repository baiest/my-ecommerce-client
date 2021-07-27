import React from 'react'
import user from '../assets/icons/user.png'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'
import Category from './Category'

const Navbar = (props) => {
        return (
            <nav className="navbar">
                <Link to='/'>
                    <h1 className="navbar__hero">{props.ecommerce_name}</h1>
                </Link>
                <Category ecommerce_name="Nombre" category_selected= {props.category_selected}/>
                <button onClick={props.handleSearch}>buscar</button>
                <section id="user" className="navabar__user">
                    <img src={user} alt="User icon" />
                    <div className="navabar__user-info">
                        <p>{props.name}</p>
                        <p>{props.lastname}</p>
                    </div>
                    <span>Ajustes</span>
                </section>
            </nav>
        )
}

export default Navbar
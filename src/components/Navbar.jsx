import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'
import Category from './Category'
import find from '../assets/icons/lupa.svg'
import user from '../assets/icons/user.svg'
import kart from '../assets/icons/kart.svg'
import conf from '../assets/icons/conf.svg'

const Navbar = (props) => {
        return (
            <nav className="navbar">
                <Link to='/'>
                    <h1 className="navbar__hero">{props.ecommerce_name}</h1>
                </Link>
                <Category ecommerce_name="Nombre" category_selected= {props.category_selected}/>
                <img className="navbar__find" src={find} onClick={props.handleSearch} />
                <section id="user" className="navabar__user">
                    <img src={user} alt="User icon" />
                    <div className="navabar__user-info">
                        <p>{props.name}</p>
                        <p>{props.lastname}</p>
                    </div>
                </section>
                <div className="conf icon">
                    <img className="navbar__kart" src={kart} alt="User icon" />
                    <span className="number">4</span>
                    <span>Carrito</span>
                </div>
                <div className="conf">
                    <img className="navbar__conf" src={conf} alt="Configuration icon" />
                    <span>Ajustes</span>
                </div>
            </nav>
        )
}

export default Navbar
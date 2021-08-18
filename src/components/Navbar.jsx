import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'
import Category from './Category'
import find from '../assets/icons/lupa.svg'
import user from '../assets/icons/user.svg'
import kart from '../assets/icons/kart.svg'
import conf from '../assets/icons/conf.svg'

const Navbar = (props) => (
    <nav className="navbar">
        <h1 className="navbar__hero">
            <Link to='/'>
                {props.ecommerce_name}
            </Link>
        </h1>
        <Category ecommerce_name="Nombre" category_selected= {props.category_selected}/>
        <div className="icon">
            <img className="navbar__find" src={find} onClick={props.handleSearch} alt="Find icon" />
            <span>Buscar</span>
        </div>
        <Link to='/client/cart' className="icon">
            <img className="navbar__kart" src={kart} alt="Cart icon" />
            {
                props.cartCount && <span className="number">{props.cartCount}</span>
            }
            <span>Carrito</span>
        </Link>
        <section id="user" className="navabar__user">
            <img src={user} alt="User icon" />
            <div className="navabar__user-info">
                <p>{props.name}</p>
                <p>{props.lastname}</p>
            </div>
            <ul className="navbar__dropdown">
                <li className="dropdown__item">   
                    <img className="navbar__conf" src={conf} alt="Configuration icon" />
                    <span>Ajustes</span>
                </li>
                <li className="dropdown__item" >
                {
                    props.cookie 
                    ? <div onClick={props.logOut}>
                        <img className="navbar__conf" src={conf} alt="Configuration icon" />
                        <span>Log-Out</span>
                    </div>
                    : <Link to='/login' className="dropdown__item">
                        <img className="navbar__conf" src={conf} alt="Configuration icon" />
                        <span>Login</span>
                    </Link>
                }
                </li>
            </ul>
        </section>
    </nav>
)

export default Navbar
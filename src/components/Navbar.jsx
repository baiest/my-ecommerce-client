import React from 'react'
import user from '../assets/icons/user.png'
import '../assets/css/Navbar.css'

const Navbar = (props) => {
        return (
            <nav className="navbar">
                <h1 className="navbar__hero">{props.ecommerce_name}</h1>
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
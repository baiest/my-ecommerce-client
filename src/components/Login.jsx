import React from 'react'
import axios from 'axios'
import { API_LOGIN } from '../providers/api'
import { Redirect } from 'react-router-dom'
import '../assets/css/Login.css'
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user_email: 'juanba@gmail.comd',
            user_password: 'dajskld',
            error: ''
        }
        this.source = axios.CancelToken.source();
    }
    
    login = async(e) => {
        e.preventDefault()
        const { user_email, user_password} = this.state
        try{
            const response = await axios.post(
                API_LOGIN, 
                {
                    user_email,
                    user_password
                }
            )
            this.props.createCookie(response.data.token)
            window.location.reload()
        }catch(error){
            if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
                this.setState({error: error.response?.data.error || error.message, loading: false, user_password: ''})
            }
        }
    }

    handleInput = (e) => {  
        const {id, value} = e.target
        const form = {}
        form[id] = value
        this.setState(form)
    }

    componentWillUnmount(){
        if (this.source) {
            this.source.cancel();
        }
    }

    render(){
        if (this.props.cookie) {
            return <Redirect to='/'/>
        }
        return (
            <div className="login">
                <h2>Login</h2>
                {
                    this.state.error 
                    ? <p className="login__error">{this.state.error}</p>
                    : <p className=""></p>
                }
                <form onSubmit={this.login}>
                    <div className="login__input">
                        <input className="" type="email" name="user_email" id="user_email" placeholder="Correo" onChange={this.handleInput} value={this.state.user_email}
                        style={{borderColor: this.state.error && 'lightcoral'}} required/>
                        <label className="login__input-label" htmlFor="user_email">Correo</label>
                    </div>
                    <div className="login__input">
                        <input className="" type="password" name="user_password" id="user_password" placeholder="Contraseña" onChange={this.handleInput} value={this.state.user_password}
                        style={{borderColor: this.state.error && 'lightcoral'}} required/>
                        <label className="login__input-label" htmlFor="user_password">Contraseña</label>
                    </div>
                    <input type="submit" className="login__submit" value="Entrar"/>
                </form>
                <a href='/'>Terminos y condiciones</a>
                <a href="/">¿Olvidó su contraseña?</a>
            </div>
        )
    }
}

export default Login
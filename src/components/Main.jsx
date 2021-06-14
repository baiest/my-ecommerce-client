import React from 'react'
import BoardProducts from './BoardProducts'

import '../assets/css/Main.css'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <section className="main">
                <div className="main__find">
                    <input type="text" />
                    <button>buscar</button>
                </div>
                <img src="https://i.blogs.es/575d4f/android/840_560.jpg" alt="" />
                <div className="main__products">
                    <BoardProducts products_url="products" />
                </div>
            </section>
        )
    }
}

export default Main
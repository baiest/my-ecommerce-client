import React from 'react'
import BoardProducts from './BoardProducts'
import { Switch, Route } from 'react-router-dom'
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
                    <Switch>
                        <Route exact path='/'
                            render={() => <BoardProducts products_url={`products/`} />}
                            />
                        {
                            this.props.routes.map(r => {
                                //POR CADA CATEGORIA SE CREA UNA RUTA, Y LA PETICION ESTA DADA POR EL ID DE LA CATEGORIA
                                return <Route key= {r.route_id} exact path={`/category/${r.route_name}`}
                                render={() => <BoardProducts products_url={`products/category/${r.route_id}`} />}
                                />
                            })
                        }
                    </Switch>
                </div>
            </section>
        )
    }
}

export default Main
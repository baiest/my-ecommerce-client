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
                <div className="main__products">
                    <Switch>
                        <Route exact path='/'
                            render={() => <h1>Hola aqui ira un hero y categorias</h1>}
                            />
                        {
                            this.props.routes.map(r => {
                                //POR CADA CATEGORIA SE CREA UNA RUTA, Y LA PETICION ESTA DADA POR EL ID DE LA CATEGORIA
                                return <Route key= {r.route_id} exact path={`/category/${r.route_name}`}
                                render={() => <BoardProducts products_url={r.route_id} />}
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
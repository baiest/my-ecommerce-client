import React from 'react'
import BoardProducts from './BoardProducts'
import { Switch, Route } from 'react-router-dom'
import '../assets/css/Main.css'
import axios from 'axios'
import { API_PRODUCTS } from '../providers/api'
import Carousel from './Carousel';
import Error from './general/Error'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            new : [],
            buy: [],
            loading: true,
            error: ''
        }
        this.source = axios.CancelToken.source();
    }

    async componentDidMount(){
        try{
            const responseNew = await axios.get(API_PRODUCTS,  {
                cancelToken: this.source.token
            })
            const responseBuy = await axios.get(API_PRODUCTS,  {
                cancelToken: this.source.token
            })
            this.setState({
                new: responseNew.data,
                buy: responseBuy.data, 
                loading: false})
            console.log(this.state)
        }catch(error){
            if(!axios.isCancel(error) && error.code !== 'ECONNABORTED'){
                this.setState({error: error.message, loading: false})
            }
        }
    }

    componentWillUnmount(){
        if (this.source) {
            this.source.cancel();
        }
    }

    mainInformation = () => {
        if(this.state.error){
            return <Error message={this.state.error} /> 
        } 
        if(this.state.loading){
            return <div className="loader"></div> 
        } 
        return(
            <React.Fragment>
                <h2 className="container">¿Que hay de <strong>Nuevo</strong>?</h2>
                <Carousel id="carousel-new" data={this.state.new || []}/>
                <h2 className="container">Lo más <strong>Comprado</strong></h2>
                <Carousel id="carousel-buy" data={this.state.buy || []}/>
                <h2 className="container">Lo más <strong>Comprado</strong></h2>
                <Carousel id="carousel-other" data={this.state.buy || []}/>
            </React.Fragment>
        )
    }

    render(){
        return(
            <section className="main main__products">
                    <Switch>
                        <Route exact path='/'
                            render={this.mainInformation}
                        />
                        {
                            this.props.routes.map(r => {
                                //POR CADA CATEGORIA SE CREA UNA RUTA, Y LA PETICION ESTA DADA POR EL ID DE LA CATEGORIA
                                return <Route key= {r.route_id} exact path={`/category/${r.route_name}`}
                                render={() => 
                                <div className="container">
                                    <BoardProducts products_url={r.route_id} />
                                </div>
                                }
                                />
                            })
                        }
                    </Switch>
            </section>
        )
    }
}

export default Main
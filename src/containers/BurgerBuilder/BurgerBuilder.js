import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../withErrorHandler/withErrorhandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {

    state = {
        ingradients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-158da.firebaseio.com/ingradients.json')
            .then(request => {
                this.setState({ingradients: request.data});
            });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true});
    }

    updatePurchase(ingradients) {
        const sum = Object.keys(ingradients)
            .map(igKey => {
                return ingradients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingradients[type];
        const updatedCount = oldCount + 1;
        const updateIngradientes = {...this.state.ingradients};
        updateIngradientes[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingradients: updateIngradientes});
        this.updatePurchase(updateIngradientes);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingradients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngradientes = { ...this.state.ingradients };
        updateIngradientes[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingradients: updateIngradientes });
        this.updatePurchase(updateIngradientes);
    } 

    purchseCanclleHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = Object.keys(this.state.ingradients)
            .map(igKey => {
                return encodeURIComponent(igKey) + '=' + encodeURIComponent(this.state.ingradients[igKey]);
        });
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render () {
        const disableInfo = {
            ...this.state.ingradients
        }
        
        let orderSummery = null;

        let ingredientComponent = <Spinner />

        if (this.state.ingradients) {
            ingredientComponent = (
                <Aux>
                    <Burger ingradients={this.state.ingradients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>);

            orderSummery = <OrderSummery
                ingredients={this.state.ingradients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchseCanclleHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
                
        }
            
        if (this.state.loading) {
            orderSummery = <Spinner />;
        }


        for(let i in disableInfo) {
            disableInfo[i] = disableInfo[i] <= 0;
        }
        
        return ( 
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchseCanclleHandler}>
                    {orderSummery}
                </Modal>
                {ingredientComponent}
            </Aux>
        );
    }
}

export default WithErrorHandler(withRouter(BurgerBuilder), axios);

import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../withErrorHandler/withErrorhandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {

    state = {
        ingradients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: null,
        loading: false
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
        this.setState({ purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true})
        let order = {
            ingradients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Fisnik Canaj',
                addres: {
                    street: 'Teststreet 1',
                    zipCode: '123',
                    country: 'Kline'
                },
                email: 'canajfisnik@gmail.com'
            }
        }
     
        axios.post('/orders.json', order)
            .then(request => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => { 
                this.setState({ loading: false, purchasing: false });
            });
    }

    render () {
        const disableInfo = {
            ...this.state.ingradients
        }
        
        let orderSummery = <OrderSummery
            ingredients={this.state.ingradients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchseCanclleHandler}
            purchaseContinued={this.purchaseContinueHandler} />;

        if(this.state.loading) {
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
                <Burger ingradients={this.state.ingradients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);

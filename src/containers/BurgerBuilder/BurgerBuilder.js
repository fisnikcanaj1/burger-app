import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

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
        purchasable: false
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

    render () {
        const disableInfo = {
            ...this.state.ingradients
        }
        
        for(let i in disableInfo) {
            disableInfo[i] = disableInfo[i] <= 0;
        }
        
        return ( 
            <Aux>
                <Modal />
                <Burger ingradients={this.state.ingradients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;

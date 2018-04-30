import React, { Component } from 'react';
import CheckoutSummery from '../../components/Burger/Order/CheckoutSummery/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingradients: {
            bacon: 1,
            meat: 1,
            salad: 1,
            cheese: 1
        }
    }

    render() {
        return (
            <div>   
                <CheckoutSummery ingradients={this.state.ingradients}/>
            </div>
        );
    }
}

export default Checkout;
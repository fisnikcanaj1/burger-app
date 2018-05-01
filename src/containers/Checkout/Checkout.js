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

    checkoutCancelleHandler = () => {        
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-info')        
    }

    render() {
        return (
            <div>   
                <CheckoutSummery 
                    ingradients={this.state.ingradients}
                    checkoutCancelled={this.checkoutCancelleHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
            </div>
        );
    }
}

export default Checkout;
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummery from '../../components/Burger/Order/CheckoutSummery/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingradients: null,
        totalPrice: 0
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingradients = {};
        let price = 0;
        for(let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingradients[param[0]] = +param[1];
            }
        }

        this.setState({ingradients: ingradients, totalPrice: price});
    }

    checkoutCancelleHandler = () => {        
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data')        
    }

    render() {
        return (
            <div>   
                <CheckoutSummery 
                    ingradients={this.state.ingradients}
                    checkoutCancelled={this.checkoutCancelleHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={() => (<ContactData ingredients={this.state.ingradients} price={this.state.totalPrice} />)}
                    />
            </div>
        );
    }
}

export default Checkout;
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CheckoutSummery from '../../components/Burger/Order/CheckoutSummery/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingradients: null
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingradients = {};

        for(let param of query.entries()) {
            ingradients[param[0]] = +param[1];
        }

        this.setState({ingradients: ingradients});
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
                        render={() => (<ContactData ingredients={this.state.ingradients} />)}
                    />
            </div>
        );
    }
}

export default Checkout;
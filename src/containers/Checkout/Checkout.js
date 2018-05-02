import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CheckoutSummery from '../../components/Burger/Order/CheckoutSummery/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingradients: {

        }
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

export default withRouter(Checkout);
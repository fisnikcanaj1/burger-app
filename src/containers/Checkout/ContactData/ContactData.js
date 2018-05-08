import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom';
import classes from './ContactData.css';
import axios from 'axios';
import Aux from '../../../hoc/ReactAux';


class ContactData extends Component {
    state = {
        ingredients: null,
        price: 4,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        this.setState({ loading: true})
        let order = {
            ingradients: this.props.ingredients,
            price: this.props.price,
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

        axios.post('https://react-my-burger-158da.firebaseio.com/orders.json', order)
            .then(request => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => { 
                this.setState({ loading: false });
            });

        this.setState({ingredients: this.props.ingredients, price: this.props.price});
        e.preventDefault();
    }

    render() {
        let form = (<Aux>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name " />
                    <input type="text" name="email" placeholder="Your email " />
                    <input type="text" name="street" placeholder="Your Street " />
                    <input type="text" name="postal" placeholder="Your Postal Code " />
                    <Button btnType="Success" clicked={this.orderHandler} > ORDER </Button>
                </form>
            </Aux>);

        if(this.state.loading) {
            form = (<Spinner />);
        }

        return (<div className={classes.ContactData}>
            {form}
        </div>);
    }
}

export default withRouter(ContactData);
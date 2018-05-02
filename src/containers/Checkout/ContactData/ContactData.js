import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        ingredients: null,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        this.setState({ingredients: this.props.ingredients});
        e.preventDefault();
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name " />
                    <input type="text" name="email" placeholder="Your email " />
                    <input type="text" name="street" placeholder="Your Street " />
                    <input type="text" name="postal" placeholder="Your Postal Code " />
                    <Button btnType="Success" clicked={this.orderHandler} > ORDER </Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
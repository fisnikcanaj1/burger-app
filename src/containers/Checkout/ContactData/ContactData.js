import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom';
import classes from './ContactData.css';
import axios from 'axios';
import Aux from '../../../hoc/ReactAux';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (e) => {
        this.setState({ loading: true})
        let order = {
            ingradients: this.props.ingredients,
            price: this.props.price
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
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<Aux>
                <h4>Enter your Contact Data</h4>
                <form>
                    {formElementArray.map(formElement => {                        
                    console.log(formElement.config.value);   
                            return (<Input 
                                key={formElement.id}
                                elementtype={formElement.config.elementType} 
                                elementconfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                />
                            )
                        
                        })
                    }
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
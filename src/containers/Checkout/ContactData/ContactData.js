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
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                
            }
        },
        loading: false
    }

    orderHandler = (e) => {
        this.setState({ loading: true})
        let formData = {};
        let order = {
            ingradients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
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

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '';
            if(rules.minLength) {
                isValid = value.length >= rules.minLength;
            }
            else if(rules.minLength) {
                isValid = value.length <= rules.maxLength;
            }
            
        }
        return isValid;

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);

        updateFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => {                        
                            return (<Input 
                                key={formElement.id}
                                elementtype={formElement.config.elementType} 
                                elementconfig={formElement.config.elementConfig}
                                value={formElement.config.value}    
                                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                shouldValidate={formElement.config.validation}
                                />
                            );
                        
                        })
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler} > ORDER </Button>
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
import React from 'react';
import Aux from '../../../hoc/ReactAux'
import Button from '../../UI/Button/Button'

const orderSummery = (props) => {
    const ingredientsSummery = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                    <strong style={{textTransform: 'capitalize'}}>{igKey}</strong>: {props.ingredients[igKey]}
                </li>);
        });

    return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicios burger with following ingredients: </p>
                <ul>
                    {ingredientsSummery}
                </ul>
                <p><strong>Total price: </strong> {props.price.toFixed(2)}</p>
                <p>Continue to chekout</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled} >CANCLE </Button>
                <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE </Button>
            </Aux>
        );
};

export default orderSummery;
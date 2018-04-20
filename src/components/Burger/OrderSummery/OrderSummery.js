import React from 'react';
import Aux from '../../../hoc/ReactAux'

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
                <p>Continue to chekout</p>
            </Aux>
        );
};

export default orderSummery;
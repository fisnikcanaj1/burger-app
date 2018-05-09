import React from 'react';
// import Order from '../../../containers/Orders/Orders';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];
    console.log(props.ingredients);
    for (let i in props.ingredients) {
        ingredients.push({
            name: i,
            amount: props.ingredients[i]
        });
    }

    const ingredintOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            border: '1px solid lightgrey',
            margin: '0 3px',
            padding: '0 3px',
            boxSizing: 'border-box'
        }} key={ig.name}> {ig.name} ({ig.amount}) </span>
    });

    console.log(ingredintOutput);
    return (
        <div className={classes.Order}>
            <p>Ingredints: {ingredintOutput}</p>
            <p>price: <strong> USD {props.price.toFixed(2)}</strong></p>
        </div>
        );
}

export default order;
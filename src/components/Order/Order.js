import React from 'react';
// import Order from '../../../containers/Orders/Orders';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredints: {props.ingredients}</p>
            <p>price: <strong> USD {props.price.toFixed(2)}</strong></p>
        </div>
        );
}

export default order;
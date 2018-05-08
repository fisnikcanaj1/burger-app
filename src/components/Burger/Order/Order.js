import React from 'react';
import Order from '../../../containers/Orders/Orders';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredints: Salad (1)</p>
            <p>price: <strong> USD 5.45</strong></p>
        </div>
        );
}

export default order;
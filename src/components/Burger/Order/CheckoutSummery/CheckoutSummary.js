import React from 'react';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasets well!</h1>
            <div>
                <Burger ingradients={props.ingradients} />                
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL
            </Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;
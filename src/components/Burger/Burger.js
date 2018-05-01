import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformIngradients = Object.keys(props.ingradients)
        .map(igKey => {
            return [...Array(props.ingradients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el); 
        }, []);

    if(transformIngradients.length === 0) {
        transformIngradients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngradients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
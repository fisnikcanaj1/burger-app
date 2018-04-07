import React from 'react';
import classes from './BuildControld.css'
const buildControl = (props) => (
    <div>
        <div className={BuildControl}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
);

export default buildControl;
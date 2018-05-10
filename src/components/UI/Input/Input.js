import React from "react";
import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputClasses];

    console.log(props.invalid);

    if(props.invalid) {
        inputClasses.push(classes.Invald);
    }

    switch (props.elementtype) {
        case ('input'):
            inputElement = <input  
                className={inputClasses.join(' ')} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementconfig} 
                value={props.value} />;
            break;
        case ('select'):
            inputElement = <select
                className={classes.InputElement}
                value={props.value} 
                onChange={props.changed}>;
                {props.elementconfig.options.map(option => (
                    <option value={option.value} key={option.value}> 
                        {option.displayValue} 
                    </option>
                ))}
            </ select>
            break;
        default:
            inputElement = <input 
                className={inputClasses} 
                {...props.elementconfig} 
                value={props.value} 
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label> {props.label} </label>
            {inputElement}
        </div>
    );
};

export default input;
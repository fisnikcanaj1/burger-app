import React from 'react';
import classess from './Modal.css'

const modal = (props) => {
    return (
        <div className={classess.Modal}>
            {props.children}
        </div>
    );
};

export default modal;
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/ReactAux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.BackDrop, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.BackDrop, classes.Open];
    }
    
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />  
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo style={{ marginLeft: 0 }} />
                </div>
                <nav>
                    <NavigationItems />
                </nav>          
            </div>
        </Aux>
    );
};

export default sideDrawer;
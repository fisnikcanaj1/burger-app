import React, { Component } from 'react';
import classess from './Modal.css';
import Aux from '../../../hoc/ReactAux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props.show  || nextProps.children === this.props.children;
    }

    render() {
        return (
            <Aux>    
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }} className={classess.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
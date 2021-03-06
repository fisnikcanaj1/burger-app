import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrapperComponent, axios)  => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            axios.interceptors.response.use(req => {
                this.setState({ error: null })
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: null });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        } 

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.porps} />
                </Aux>
            );
        }
        
    }
}

export default errorHandler;
import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

    state = {
        ingradients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render () {
        return <Aux>
            <Burger ingradients={this.state.ingradients} />
            <div>Build Controls</div>
        </Aux>
    }
}

export default BurgerBuilder;

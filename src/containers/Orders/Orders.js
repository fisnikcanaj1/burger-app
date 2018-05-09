import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentWillMount() {
        axios.get('https://react-my-burger-158da.firebaseio.com/orders.json')
            .then((request) => {
                let fetchedOrders = [];
                for(let key in request.data) {
                    fetchedOrders.push({
                        ...request.data[key],
                        id: key
                    });
                }
                
                this.setState({loading: false, orders: fetchedOrders});
            }).catch((e) => {
                this.setState({loading: false}); 
            });
    }

    render() {
         
        return (<div>
                {this.state.orders.map(order => {
                    return <Order 
                        key={order.id} 
                        ingredients={order.ingradients}
                        price={+order.price}/>
                })}
            </div>)

    }
}

export default Orders;
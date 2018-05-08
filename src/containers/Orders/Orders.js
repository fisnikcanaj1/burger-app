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
                // console.log(request.data)
                let fetchedOrders = [];
                for(let key in request.data) {
                    fetchedOrders.push({
                        ...request.data[key],
                        id: key
                    });
                }
                
                this.setState({loading: false, orders: fetchedOrders});
                console.log(this.state.orders);
            }).catch((e) => {
                this.setState({loading: false}); 
                console.log(e);
            });
    }

    render() {
        // console.log(this.state.orders);
         
        return (<div>
                {this.state.orders.map(order => {
                // console.log(order.ingredients);
                    return <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={+order.price}/>
                })}
            </div>)

    }
}

export default Orders;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-158da.firebaseio.com/'
});

export default instance;
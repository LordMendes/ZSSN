import axios from 'axios';

const api = axios.create({
    baseURL: 'http://zssn-backend-example.herokuapp.com'
})



export default api;
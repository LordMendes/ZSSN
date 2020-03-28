import axios from 'axios';

async function api(method, url, data){
 return(
    await axios({
        method: method,
        url: 'http://zssn-backend-example.herokuapp.com/'+url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        params:{
            data
        }
    })
 );
};

export default api;
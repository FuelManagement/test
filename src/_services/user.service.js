import { authHeader, config, Utils } from '../_helpers';
import { login as loginData } from '../../server';

const { handleError, handleResponse } = Utils;

export const userService = {
    login,
    logout,
    register,
    getAllPo,
    createPo
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(config.apiUrl + '/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(tokenRes => {
            if (tokenRes && tokenRes.token) {
                localStorage.setItem('token', JSON.stringify(tokenRes));
            } else {
                throw new Error("Invalid request. No token received");
            }
            console.log('token'+tokenRes.token);
            return getUser(tokenRes.token);

        })
        .catch(handleError);
}

function getUser(token=""){
    const requestOptions = {
        method: 'GET'
    };
    return fetch(config.apiUrl + '/users/current', {...requestOptions, headers:authHeader()})
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify({...user, token}));
            return {...user, token};
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function getPOList(){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getOrderList/?email='+user.email, requestOptions)
    .then(handleResponse)
}

function getAllPo() {
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        let totalOrders = [];
        totalOrders = totalOrders.concat(filterPendingOrders(purchaseOrders.acion_details));
        totalOrders = totalOrders.concat(purchaseOrders.acion_details.filter(order => {
            return order.status === "DispatchedByExporter"  
                    && order.User_ID === user.email
            })
        )
        return totalOrders;
    }).catch(handleError);
}

function filterPendingOrders(purchaseOrders){
    let user = JSON.parse(localStorage.getItem('user'));
    let tmp = (order, orders) => {
        let flag = true;
        for(let j=0; j<orders.length; j++){
            if(orders[j].ImporterPONumber === order.PONumber){
                flag = false;
                break;
            }
        }
        return flag;    
    }
    return purchaseOrders.filter(order => {
        return order.status === "Placed order By Importer"
                && order.User_ID === user.email
                && tmp(order, purchaseOrders);
    })
}

function createPo(formData) {
    let user = localStorage.getItem('user');
    user = typeof user === 'string'? JSON.parse(user):{};
    let tmpDate = new Date();
    let month = tmpDate.getMonth()+1 > 9 ? tmpDate.getMonth()+1 : "0"+(tmpDate.getMonth()+1);
    formData.append("ImporterPONumber", "");
    formData.append("Status", "Placed order By Importer");
    formData.append("date", month+"-"+tmpDate.getDate()+"-"+tmpDate.getFullYear());
    formData.append("time", tmpDate.getHours()+":"+tmpDate.getMinutes());
    formData.append("User_Type", user.role);
    formData.append("User_ID", user.email);
    formData.delete('Date');
    let data = {};
    formData.forEach((value, key)=> {
        data[key] = value;
    });
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(config.apiUrl + '/product/placeOrder', requestOptions).then(handleResponse, handleError);
}

function register(user) {
    let requestData = {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
        role:user.rolesRequested,
        address: user.address
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    };

    return fetch(config.apiUrl + '/users/register', requestOptions).then(handleResponse, handleError);
}

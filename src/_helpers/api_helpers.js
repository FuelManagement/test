import { authHeader, config, Utils } from './';
const { handleError, handleResponse } = Utils;
export class API_Helpers {
    static getAllUsers(){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
        return fetch(config.apiUrl + '/admin/getAllUsers', requestOptions)
        .then(response => {
            if (response.ok) {
                try{
                    return response.json()
                    .catch(err => {
                        console.log("Invalid response headers/content")
                        // ignoring response type/msg in case of 200 status
                       return "Success";
                    });
                }catch(e){
                    return Promise.reject("Invalid response");
                }
            } else {
                // return error message from response body
                return response.text().then(text => Promise.reject(text));
            }
        })
        .catch(error => Promise.reject(error.message || error));
    }

    static verifyOrderAlterations(row){
        let user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        // return Promise.resolve(false);
        return fetch(config.apiUrl + '/product/getOrderDetails?email=' + user.email+'&orderID='+row.PONumber, requestOptions)
        .then(response => {
            if (response.ok) {
                try{
                    return response.json()
                    .catch(err => {
                        console.log("Invalid response headers/content")
                        return Promise.reject("Exception");
                    });
                }catch(e){
                    return Promise.reject("Invalid response");
                }
            } else {
                return response.text().then(text => Promise.reject(text));
            }
        })
        .then(res => {
            // {OrderID: "1234", RPAQuantity: "1000", IOTQuantity: "9000"}
            let diff= 0;
            if(Number(res.RPAQuantity) < Number(res.IOTQuantity)){
                diff = (Number(res.IOTQuantity)-Number(res.RPAQuantity))/Number(res.RPAQuantity) * 100
            } else {
                diff = (Number(res.RPAQuantity)-Number(res.IOTQuantity))/Number(res.RPAQuantity) * 100
            }
            if(diff > 10) return false;
            return true;
        })
        .catch(error => Promise.reject(error.message || error));
    }

    static getAllProducts(){
        let user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(config.apiUrl + '/product/getProductList?userID=admin@geonet.com', requestOptions)
        .then(response => {
            if (response.ok) {
                try{
                    return response.json()
                    .catch(err => {
                        console.log("Invalid response headers/content")
                        // ignoring response type/msg in case of 200 status
                       return "Success";
                    });
                }catch(e){
                    return Promise.reject("Invalid response");
                }
            } else {
                // return error message from response body
                return response.text().then(text => Promise.reject(text));
            }
        })
        .catch(error => Promise.reject(error.message || error));
    }
    
    static getAllParticipant() {
        let user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(config.apiUrl + '/product/getParticipants', requestOptions)
            .then(handleResponse)
    }
}
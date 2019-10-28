import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const refineryService = {
    getAllToDispatch,
    getAllDispatchedOrders,
    dispatchOrder
};

function getAllToDispatch() {
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "Placed order By Exporter"
            && order.POFrom === user.email;
        })
    }).catch(handleError);
}

function getAllDispatchedOrders(){
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "Dispatched"
            && order.POFrom === user.email;
        })
    }).catch(handleError);
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

function dispatchOrder(order) {
    let user = localStorage.getItem('user');
    user = typeof user === 'string'? JSON.parse(user):{};
    let tmpDate = new Date();
    let month = tmpDate.getMonth()+1 > 9 ? tmpDate.getMonth()+1 : "0"+(tmpDate.getMonth()+1);
    return uploadFiles(order.input_Document)
    .then(uploadResponse => {
        let requestData = {
            ImporterPONumber: order._original.ImporterPONumber,
            PONumber: order.PONumber,
            User_ID: user.email,
            User_Type: user.role,
            date: month+"-"+tmpDate.getDate()+"-"+tmpDate.getFullYear(),
            files: uploadResponse,
            hashes: "0101pqp101010010",
            time: tmpDate.getHours()+":"+tmpDate.getMinutes()
        }
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(requestData)
        };
        return fetch(config.apiUrl + '/product/dispatch', requestOptions).then(handleResponse, handleError);
    })
}

function uploadFiles2(data){
    let formData = new FormData();
    formData.append('file', data);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };
    requestOptions.headers['Content-Type'] = undefined;
    return fetch(config.apiUrl + '/product/uploadFile', requestOptions).then(handleResponse, handleError);
}

function uploadFiles(data){
    
    return new Promise((resolve, reject) => {
        var form = new FormData();
        for(let i=0; i<data.length; i++){
            form.append("file", data[i]);
        }
        let tokenObj = JSON.parse(localStorage.getItem('token'));
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.apiUrl + '/product/uploadFile',
        "method": "POST",
        "headers": {
            "Content-Type": undefined,
            "Authorization": 'Bearer '+tokenObj.token,
            "Accept": "*/*",
            "Cache-Control": "no-cache",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
        }
        $.ajax(settings).done(function (response) {
            resolve(response);
        });
    })
}

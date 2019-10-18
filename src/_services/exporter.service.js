import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;

export const exporterService = {
    getAllPo,
    createRefineryPO,
    getAllToDispatch,
    getAllDispatched,
    dispatchOrder,
    getAllSupplierPo
};

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
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "Placed order By Importer" 
                    && order.POFrom === user.email
                    && !order.ImporterPONumber.length
                    && tmp(order, purchaseOrders.acion_details);
        })
    }).catch(handleError);
}

function getAllSupplierPo() {
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "Placed order By Exporter" 
                    && order.User_ID === user.email
        })
    }).catch(handleError);
}

function tmp(order, orders){
    let flag = true;
    for(let j=0; j<orders.length; j++){
        if(orders[j].ImporterPONumber === order.PONumber){
            flag = false;
            break;
        }
    }
    return flag;    
}

function getAllToDispatch() {
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "Dispatched"
            && order.User_ID === user.email;
        })
    }).catch(handleError);
}

function getAllDispatched() {
    let user = JSON.parse(localStorage.getItem('user'));
    return getPOList()
    .then(purchaseOrders => {
        return purchaseOrders.acion_details.filter(order => {
            return order.status === "DispatchedByExporter"
            && order.User_ID === user.email;
        })
    }).catch(handleError);
}

function createRefineryPO(row) {
    let user = localStorage.getItem('user');
    user = typeof user === 'string'? JSON.parse(user):{};
    let tmpDate = new Date();
    let month = tmpDate.getMonth()+1 > 9 ? tmpDate.getMonth()+1 : "0"+(tmpDate.getMonth()+1);
    let formData = {
        "ImporterPONumber": row.ImporterPONumber,
        "POFrom": row.POFrom,
        "PONumber": row.PONumber,
        "Price": row.Price,
        "Product": row.product,
        "Quantity": row.quantity,
        "Status": "Placed order By Exporter",
        "User_Type": user.role,
        "User_ID": user.email,
        "date":  month+"-"+tmpDate.getDate()+"-"+tmpDate.getFullYear(),
        "time": tmpDate.getHours()+":"+tmpDate.getMinutes()
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };

    return fetch(config.apiUrl + '/product/placeOrder', requestOptions).then(handleResponse, handleError);
}

function dispatchOrder(order) {
    let user = localStorage.getItem('user');
    user = typeof user === 'string'? JSON.parse(user):{};
    let tmpDate = new Date();
    let month = tmpDate.getMonth()+1 > 9 ? tmpDate.getMonth()+1 : "0"+(tmpDate.getMonth()+1);
    let requestData = {
        ImporterPONumber: order.ImporterPONumber,
        PONumber: order.PONumber,
        User_ID: user.email,
        User_Type: user.role,
        date: month+"-"+tmpDate.getDate()+"-"+tmpDate.getFullYear(),
        files: "[]",
        hashes: "0101pqp101010010",
        time: tmpDate.getHours()+":"+tmpDate.getMinutes()
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(config.apiUrl + '/product/dispatch', requestOptions).then(handleResponse, handleError);
}

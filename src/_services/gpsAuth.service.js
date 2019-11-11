import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;


export const gpsAuthService = {
    getCustomerByCarrierId,
    otrGpsAuthForCustomer,
    getCustomerOrders
}

function getCustomerByCarrierId() {
    // const CustomerNames = [{
    //     value: 'CFEnergia power',
    //     label: 'CFEnergia power'
    // },{
    //     value: 'BP Gas station',
    //     label: 'BP Gas station'
    // }];
    // return Promise.resolve(CustomerNames);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/otr/getCustomersByCarrierID?carrierId=energroup.com', requestOptions).then(handleResponse)
}

function otrGpsAuthForCustomer() {

}

function getCustomerOrders(data){
    const Orders = [
        {
            value: '20133',
            label: '20133',
            status: ''
        },
        {
            value: '20134',
            label: '20134',
            status: ''
        },
        {
            value: '20135',
            label: '20135',
            status: 'Approved'
        }
    ];
    return Promise.resolve(Orders);
}
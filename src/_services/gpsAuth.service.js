import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;


export const gpsAuthService = {
    getCustomerByCarrierId,
<<<<<<< HEAD
    otrGpsAuthForCustomer
}

function getCustomerByCarrierId() {

=======
    otrGpsAuthForCustomer,
    getCustomerOrders
}

function getCustomerByCarrierId() {
    const CustomerNames = [{
        value: 'CFEnergia power',
        label: 'CFEnergia power'
    },{
        value: 'BP Gas station',
        label: 'BP Gas station'
    }];
    return Promise.resolve(CustomerNames);
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
}

function otrGpsAuthForCustomer() {

<<<<<<< HEAD
=======
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
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
}
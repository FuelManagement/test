import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;


export const gpsAuthService = {
    getCustomerByCarrierId,
    otrGpsAuthForCustomer
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
}

function otrGpsAuthForCustomer() {

}
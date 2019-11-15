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
<<<<<<< HEAD
    const CustomerNames = [{
        value: 'CFEnergia power',
        label: 'CFEnergia power'
    },{
        value: 'BP Gas station',
        label: 'BP Gas station'
    }];
    return Promise.resolve(CustomerNames);
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
=======
    // const CustomerNames = [{
    //     value: 'CFEnergia power',
    //     label: 'CFEnergia power'
    // },{
    //     value: 'BP Gas station',
    //     label: 'BP Gas station'
    // }];
    // return Promise.resolve(CustomerNames);
    let user = JSON.parse(localStorage.getItem('user'));
    let carrierId ='';
    if(user.participantID != undefined)
   {
      carrierId = user.participantID;
   }
   else
   {
        carrierId = user.registerId;  
   }
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/otr/getCustomersByCarrierID?carrierId='+carrierId, requestOptions).then(handleResponse)
>>>>>>> eabe38a0f62306f13f382771ffc0853cdb8db57b
}

function otrGpsAuthForCustomer(customerDetail) {
    
    let user = JSON.parse(localStorage.getItem('user'));
   // customerDetail["carrierId"] = user.participantID;
   if(user.participantID != undefined)
   {
        customerDetail.carrierId = user.participantID;
   }
   else
   {
        customerDetail.carrierId = user.registerId;  
   }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
    
      const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(customerDetail)
      };
  
      return fetch(config.apiUrl + '/otr/postOTRGPSAuthForCustomer', requestOptions).then(handleResponse, handleError);
>>>>>>> eabe38a0f62306f13f382771ffc0853cdb8db57b
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
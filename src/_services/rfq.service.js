import { authHeader, config, Utils, API_Helpers } from '../_helpers';
const { handleError, handleResponse } = Utils;
import { rfq as dummyData } from "../../server";

export const rfqService = {
    getAllRfq,
    postNewRfq,
    getAllProducts,
};

function getAllRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return Promise.resolve(dummyData);
    return fetch(config.apiUrl + '/product/getProductList?userID='+user.email, requestOptions)
    .then(handleResponse)
    .then(()=> dummyData)
    .catch(err => {
        // handleError(err)
        debugger;
        return dummyData;
    })
}
function postNewRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getProductList?userID='+user.email, requestOptions)
    .then(handleResponse)
    .then(()=> dummyData)
    .catch(err => {
        // handleError(err)
        return dummyData;
    })
}
function getAllProducts(){
    return Promise.resolve([
        {   product: 0, category: 'Category1', subCategory: 'Sub Category1', quantity: "42BBl",price:'6000 $',priceAdjustment:'80000 $', msgUnits:'42 BBL'  },
        {   product: 1, category: 'Category2', subCategory: 'Sub Category2', quantity: "56BBL",price:"7000 $",priceAdjustment:'70000 $', msgUnits:'42 BBL'  },
        {   product: 1, category: 'Category2', subCategory: 'Sub Category2', quantity: "56BBL",price:"7000 $",priceAdjustment:'70000 $', msgUnits:'42 BBL'  },
    ])
    return API_Helpers.getAllProducts();
}
import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;

let dummyData = [
    {   projectId : 101, entityType: "Exporter", projectDetails: "Some dummy text",
        startTime: "08/14/2020 08:30", endTime: "08/14/2021 08:30", status: "Open",
        activationTime: "08/14/2019 7:30", closerTime: "08/14/2019 17:30", currency: "USD",
        category: "Category1", subCategory: "SubCategory2", product: "Petrol",
        quantity: "100", price: "120", priceAdjustment: "11", quantityUnit: "Gallon",
    },
    {   projectId : 102, entityType: "Exporter", projectDetails: "Some dummy text",
        startTime: "08/14/2020 08:30", endTime: "08/14/2021 08:30", status: "Open",
        activationTime: "08/14/2019 7:30", closerTime: "08/14/2019 17:30", currency: "USD",
        category: "Category1", subCategory: "SubCategory2", product: "Petrol",
        quantity: "100", price: "120", priceAdjustment: "11", quantityUnit: "Gallon",
    },
    {   projectId : 103, entityType: "Importer", projectDetails: "Some other dummy text",
        startTime: "08/14/2020 08:30", endTime: "08/14/2021 08:30", status: "Open",
        activationTime: "08/14/2019 7:30", closerTime: "08/14/2019 17:30", currency: "USD",
        category: "Category1", subCategory: "SubCategory2", product: "Petrol",
        quantity: "100", price: "120", priceAdjustment: "11", quantityUnit: "Gallon",
    },
    {   projectId : 104, entityType: "Exporter", projectDetails: "Some dummy text",
        startTime: "08/14/2020 08:30", endTime: "08/14/2021 08:30", status: "Open",
        activationTime: "08/14/2019 7:30", closerTime: "08/14/2019 17:30", currency: "USD",
        category: "Category1", subCategory: "SubCategory2", product: "Petrol",
        quantity: "100", price: "120", priceAdjustment: "11", quantityUnit: "Gallon",
    },
    {   projectId : 105, entityType: "Exporter", projectDetails: "Some dummy text",
        startTime: "08/14/2020 08:30", endTime: "08/14/2021 08:30", status: "Open",
        activationTime: "08/14/2019 7:30", closerTime: "08/14/2019 17:30", currency: "USD",
        category: "Category1", subCategory: "SubCategory2", product: "Petrol",
        quantity: "100", price: "120", priceAdjustment: "11", quantityUnit: "Gallon",
    },
]

export const rfqService = {
    getAllRfq,
};

function getAllRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getProductList?userID='+user.email, requestOptions)
    .then(handleResponse)
    .catch(err => {
        // handleError(err)
        return dummyData;
    })
}
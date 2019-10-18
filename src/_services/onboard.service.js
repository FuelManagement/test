import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const onboardService = {
    getAllOnBoarder,
    createOnBoarder,
    createParticipant,
    updateParticipant,
    getParticipant,
    uploadFile
};

function getAllOnBoarder() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/admin/getAllParticipants', requestOptions)
    .then(handleResponse)
}
function createOnBoarder(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    let formData = {
        "firstName" :  collection.FirstName.value,
        "lastName" : collection.LastName.value,
        "domain" : collection.Domain.value,
        "email" : user.email,
        "registerId" : collection.Email.value,
        "password" : 'drtdtd',
        "participantType" : collection.ParticipantType.value,
        "isCompany" : true,
        "streetAddress" : collection.StreetAddress.value,
        "City" : collection.City.value,
        "State" : collection.State.value,
        "zip" : collection.ZipCode.value,
        "country" : collection.Country.value,
        "contactNo" : collection.Phone.value,
        "taxId" : collection.TaxId.value,
        "organisation" : collection.OrganizationName.value
    };
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };

    return fetch(config.apiUrl + '/product/createParticipant', requestOptions).then(handleResponse, handleError);

}

function createParticipant(collection)
{
   let formData={"registerId": collection.txtFullLegalName!==undefined?collection.txtFullLegalName:"",
    "dateOfIncorporation": collection.dateIncorporation!==undefined?collection.dateIncorporation:"",
    "stateOfIncorporation": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    "countryOfIncorporation": collection.txtCountryIncorporation!==undefined?collection.txtStateIncorporation:"",
    "BuisnessType": collection.ddlBusinessType!==undefined?collection.ddlBusinessType:"",
    "entityType": collection.ddlEntityType!==undefined?collection.ddlEntityType:"",
    "entityTypeOther": collection.txtEntityType!==undefined?collection.txtEntityType:"",
    "numberOfYearsinBuisness": collection.txtBusinessYear!==undefined?collection.txtBusinessYear:"",
    "emailAddress": collection.txtEmailAddress!==undefined?collection.txtEmailAddress:"",
    "companyCode": collection.txtCompanyCode!==undefined?collection.txtCompanyCode:"",

    "defaultEmailaddress": "yes",
    "streetAddress": collection.txtStreetAddress!==undefined?collection.txtStreetAddress:"",
    "postalCode": collection.txtPostalCode!==undefined?collection.txtPostalCode:"",
    "city": collection.txtNeighborhoodCity!==undefined?collection.txtNeighborhoodCity:"",
    "faxNumber": collection.txtFaxNumber!==undefined?collection.txtFaxNumber:"",
    "firstContactNumber": collection.txtFirstTelephoneNumber!==undefined?collection.txtFirstTelephoneNumber:"",
    "firstContactNumberType": collection.radioFirstTelephoneNumber!==undefined?collection.radioFirstTelephoneNumber:"mobile",
    "state": collection.txtRegion!==undefined?collection.txtRegion:"",
    "secondContactNumber": collection.txtSecondTelephoneNumber!==undefined?collection.txtSecondTelephoneNumber:"",
    "SecondContactNumberType": collection.radioSecondTelephoneNumber!==undefined?collection.radioSecondTelephoneNumber:"telephone",

    "bankName": collection.txtNameBank!==undefined?collection.txtNameBank:"",
    "bankAccountName": collection.txtAccountHolderName!==undefined?collection.txtAccountHolderName:"",
    "bankAccountNumber": collection.txtAccountNumber!==undefined?collection.txtAccountNumber:"",
    "bankControlKey": collection.txtBankControlKey!==undefined?collection.txtBankControlKey:"",
    "bankCountryKey": collection.txtBankcountrykey!==undefined?collection.txtBankcountrykey:"",
    "bankKeys": collection.txtBankkey!==undefined?collection.txtBankkey:"",
    "bankPartnerType": collection.ddlPartnerBankType!==undefined?collection.ddlPartnerBankType:"",
    "bankReferencedetail": collection.txtReferencespecificationsforbankdetails!==undefined?collection.txtReferencespecificationsforbankdetails:"",
    "poCurrency": collection.ddlPurchaseordercurrency!==undefined?collection.ddlPurchaseordercurrency:"",
    
    "taxWithholdType": collection.radioTaxType!==undefined?collection.radioTaxType:"",
    "taxWithholdingSubject": collection.radioSubjectTax!==undefined?collection.radioSubjectTax:"",
    "taxWithholdCode": collection.txtWithholdingTaxCode!==undefined?collection.txtWithholdingTaxCode:"",
    "confirmationControlkey": collection.txtConfirmationControlKey!==undefined?collection.txtConfirmationControlKey:"",
    "deleteFlagForVendor": collection.txtDeleteKey!==undefined?collection.txtDeleteKey:"",
    "shippingConditions": collection.txtShippingConditions!==undefined?collection.txtShippingConditions:"",
    "gstHstReminder": collection.radioGSTHSTVerification!==undefined?collection.radioGSTHSTVerification:"",
    "salesTaxExemption": collection.radioSalesTaxExemption!==undefined?collection.radioSalesTaxExemption:"",
    "qstVerificationReminder": collection.radioQSTVerification!==undefined?collection.radioQSTVerification:"",
    "w8-9VerificationReminder": collection.radioFormW9Verification!==undefined?collection.radioFormW9Verification:"",
    "taxNumber1": collection.txtTaxNum1!==undefined?collection.txtTaxNum1:"",
    "taxNumber2": collection.txtTaxNum2!==undefined?collection.txtTaxNum2:"",
    "vatNumber": collection.txtVatRegistration!==undefined?collection.txtVatRegistration:"",
    "vendorAcctGrp": collection.ddlVendorAccountGroup!==undefined?collection.ddlVendorAccountGroup:"",
    "vendorImporterRecord": collection.txtVendorImporterRecord!==undefined?collection.txtVendorImporterRecord:"",
    
    "clearingBetCustAndVend": "Yes",
    
    "hash": "$2a$10$Vl7Qk6VNTUQLSCBVQR77oOSGDZ9g86RkvMmesDWWIJOV/h5Ybd0pm",
    "status": 0,
    "cert_id": "",
    "isIdentityCreated": false,
    "pubKey": "",
    "priKey": "",
    "Documentslist":[],
   
};
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    console.log(formData);
    return fetch(config.apiUrl + '/product/createParticipant', requestOptions).then(handleResponse, handleError);

    
    // let tmpDate = new Date();
    // let month = tmpDate.getMonth()+1 > 9 ? tmpDate.getMonth()+1 : "0"+(tmpDate.getMonth()+1);
    // return uploadFiles(collection.input_Document)
    // .then(uploadResponse => {
    //     let requestData = {
    //             "registerId": "OneCompany7",
    //             "dateOfIncorporation": "10-01-2018",
    //             "stateOfIncorporation": "Mexico",
    //             "countryOfIncorporation": "Mexico",
    //             "BuisnessType": "Public",
    //             "entityType": "Exporter",
    //             "entityTypeOther": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    //             "numberOfYearsinBuisness": "4",
    //             "emailAddress": "test@OneCompany7.com",
    //             "defaultEmailaddress": "yes",
    //             "streetAddress": "#234,Main Street",
    //             "postalCode": "67898",
    //             "city": "mexico city",
    //             "faxNumber": "9879087659",
    //             "firstContactNumber": "3021989087",
    //             "firstContactNumberType": "mobile",
    //             "state": "MexcioState",
    //             "secondContactNumber": "5018908765",
    //             "SecondContactNumberType": "landline",
    //             "taxNumber1": "76547890",
    //             "taxNumber2": "67834567",
    //             "vatNumber": "345678654",
    //             "vendorAcctGrp": "Vendorgrp1",
    //             "vendorImporterRecord": "AU8990987",
    //             "poCurrency": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    //             "companyCode": "ONC",
    //             "clearingBetCustAndVend": "Yes",
    //             "bankName": "Bank Of America",
    //             "bankAccountName": "Richard lewis",
    //             "bankAccountNumber": "9099876545",
    //             "bankControlKey": "67876564",
    //             "bankCountryKey": "678987654",
    //             "bankKeys": "JH908765",
    //             "bankPartnerType": "samplePartnerType",
    //             "bankReferencedetail": "This is reference",
    //             "taxWithholdType": "Yes",
    //             "taxWithholdingSubject": "Yes",
    //             "taxWithholdCode": "Forc67c",
    //             "confirmationControlkey": "898877",
    //             "deleteFlagForVendor": "No",
    //             "shippingConditions": "this is for Shipping details",
    //             "gstHstReminder": "Yes",
    //             "salesTaxExemption": "No",
    //             "qstVerificationReminder": "Yes",
    //             "w8-9VerificationReminder": "No",
    //             "hash": "$2a$10$Vl7Qk6VNTUQLSCBVQR77oOSGDZ9g86RkvMmesDWWIJOV/h5Ybd0pm",
    //             "status": 0,
    //             "cert_id": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    //             "isIdentityCreated": false,
    //             "pubKey": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    //             "priKey": collection.txtStateIncorporation!==undefined?collection.txtStateIncorporation:"",
    //             "Documentslist":uploadResponse,
               
    //     };
           
    //     debugger;
    //     })
    
}
function updateParticipant()
{
  
}
function getParticipant(collection){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/admin/getAllParticipants', requestOptions)
    .then(handleResponse)
}
function uploadFile(collection)
{
    return new Promise((resolve, reject) => {
        var form = new FormData();
        for(let i=0; i<data.length; i++){
            form.append("file", data[i]);
        }
       // let tokenObj = JSON.parse(localStorage.getItem('token'));
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.apiUrl + '/product/uploadFile',
        "method": "POST",
        "headers": {
            "Content-Type": undefined,
           // "Authorization": 'Bearer '+tokenObj.token,
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
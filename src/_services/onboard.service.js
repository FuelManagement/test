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

function createParticipant(collection,Documentslist)
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
    
    "taxWithholdType": collection.radioTaxType!==undefined?collection.radioTaxType:"No",
    "taxWithholdingSubject": collection.radioSubjectTax!==undefined?collection.radioSubjectTax:"No",
    "taxWithholdCode": collection.txtWithholdingTaxCode!==undefined?collection.txtWithholdingTaxCode:"",
    "confirmationControlkey": collection.txtConfirmationControlKey!==undefined?collection.txtConfirmationControlKey:"",
    "deleteFlagForVendor": collection.txtDeleteKey!==undefined?collection.txtDeleteKey:"No",
    "shippingConditions": collection.txtShippingConditions!==undefined?collection.txtShippingConditions:"",
    "gstHstReminder": collection.radioGSTHSTVerification!==undefined?collection.radioGSTHSTVerification:"No",
    "salesTaxExemption": collection.radioSalesTaxExemption!==undefined?collection.radioSalesTaxExemption:"No",
    "qstVerificationReminder": collection.radioQSTVerification!==undefined?collection.radioQSTVerification:"No",
    "w8-9VerificationReminder": collection.radioFormW9Verification!==undefined?collection.radioFormW9Verification:"No",
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

return uploadFile(Documentslist)
    .then(uploadResponse => {
        formData.Documentslist=uploadResponse;
    const requestOptions = {
        method: 'POST',
       headers: { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       
       'Content-Length': '1315',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'localhost:3009',
       
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': '*',
       'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    return fetch(config.apiUrl + '/product/createParticipant', requestOptions).then(handleResponse, handleError);

})
    
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
        for(let i=0; i<collection.length; i++){
            form.append("file", collection[i]);
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
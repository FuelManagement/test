// export const Currency = [
//     {
//         value: "",
//         label: "None"
//     }, {
//         value: "USD",
//         label: "United State Dollor (USD)"
//     }, {
//         value: "CAD",
//         label: "Canadian Dollar (CAD)"
//     }, {
//         value: "MXN",
//         label: "mexican Peso (MXN)"
//     },
// ];
let Common_JsonData = {
  Currency: [
    {
      value: "",
      label: "None"
    }, {
      value: "USD",
      label: "United State Dollor (USD)"
    }, {
      value: "CAD",
      label: "Canadian Dollar (CAD)"
    }, {
      value: "MXN",
      label: "mexican Peso (MXN)"
    },
  ],
  EntitryType: [
    { value: "Carrier (Mex)", label: 'Carrier (Mex)' },
    { value: "Carrier (USA)", label: 'Carrier (USA)' },
    { value: "Commercial", label: 'Commercial' },
    { value: "Consortium (Support Admin)", label: 'Consortium (Support Admin)' },
    { value: "Customs Agent", label: 'Customs Agent' },
    { value: "End Buyer", label: 'End Buyer' },
    { value: "Exporter", label: 'Exporter' },
    { value: "Govt (Managerial)", label: 'Govt (Managerial)' },
    { value: "Importer", label: 'Importer' },
    { value: "Oil Well", label: 'Oil Well' },
    { value: "Refinery", label: 'Refinery' },
    { value: "Storage Tank (Mex)", label: 'Storage Tank (Mex)' },
    { value: "Storage Tank (USA)", label: 'Storage Tank (USA)' },
    { value: "Terminal (Mex)", label: 'Terminal (Mex)' },
    { value: "Terminal (USA)", label: 'Terminal (USA)' },
    { value: "Transloader (Mex)", label: 'Transloader (Mex)' },
    { value: "Transloader (USA)", label: 'Transloader (USA)' },
    { value: "Other", label: 'Other' },
  ],
  productCategory: [{
    value: "",
    label: "None"
  },
  {
    value: "prod1",
    label: "prod1"
  },
  {
    value: "prod2",
    label: "prod2"
  },],
  subCategory: [{
    value: "",
    label: "None",
    productCategory: ""
  }, {
    value: "Sub1Prod1",
    label: "Sub1Prod1",
    productCategory: "prod1"
  }, {
    value: "Sub2Prod1",
    label: "Sub2Prod1",
    productCategory: "prod1"
  }, {
    value: "Sub1Prod2",
    label: "Sub1Prod2",
    productCategory: "prod2"
  }, {
    value: "Sub2Prod2",
    label: "Sub2Prod2",
    productCategory: "prod2"
  }, {
    value: "Sub3Prod2",
    label: "Sub3Prod2",
    productCategory: "prod2"
  },],
  measuringUnit: [{
    value: "",
    label: "None"
  }, {
    value: "Litre",
    label: "Litre"
  }, {
    value: "Barrel",
    label: "Barrel"
  }, {
    value: "Gallon (US)",
    label: "Gallon (US)"
  },],
  vendorAcctGrp: [
    {
      value: "",
      label: "None"
    },
    {
      value: "10",
      label: "Account Group1"
    },
    {
      value: "20",
      label: "Account Group2"
    }
  ],
  bankPartnerType: [
    {
      value: "",
      label: "None"
    },
    {
      value: "IMF",
      label: "IMF"
    },
    {
      value: "WB",
      label: "WB"
    },

  ],
  orederTrackingRequestDetails: {
    data: [
      {
        orderName: "CFEnergia power",
        RequestedBy: "James Robert",
        Owner: "yes",
        Status: "AutoApproved",
        RequestTimings: "08/20/2019 10:00 AM",
        Approvereject: "Approve"
      },
      {
        orderName: "BP Gas station",
        RequestedBy: "JackJacob",
        Owner: "No",
        Status: "Rejected",
        RequestTimings: "08/20/2019 10:10AM",
        Approvereject: ""
      },
      {
        orderName: "Pemex Gas station",
        RequestedBy: "Thomas Noah",
        Owner: "No",
        Status: "Approved",
        RequestTimings: "08/20/2019 11:00AM",
        Approvereject: "Approve"
      },
      {
        orderName: "CFEnergia power",
        RequestedBy: "Michael William",
        Owner: "No",
        Status: "NewRequest",
        RequestTimings: "08/20/2019 12:00 PM",
        Approvereject: "Reject"
      }
    ]
  },
  orderTrackingDetails: {
    list: [
      {
        "orderid": 20133,
        "productName": "Oil",
        "supplierName": "Energroup",
        "status": "Approved",
        "trackRequest": ""

      },
      {
        "orderid": 20134,
        "productName": "Gas",
        "supplierName": "Pemex",
        "status": "Request Submitted",
        "trackRequest": ""
      },
      {
        "orderid": 20135,
        "productName": "Gas",
        "supplierName": "Pemex",
        "status": "",
        "trackRequest": ""
      }
    ],
    progressData: [
      {
        "orderno": 201333,
        "txno": "1756422245648721",
        "eta": "08/20/219 04:00 PM",
        "orderPercentage": 25
      },
      {
        "orderno": 201334,
        "txno": "1756422245648722",
        "eta": "12/20/219 09:00 AM",
        "orderPercentage": 50
      },
      {
        "orderno": 201339,
        "txno": "1756422245648723",
        "eta": "09/20/219 11:00 AM",
        "orderPercentage": 95
      }]
  }
}

module.exports = { Common_JsonData };
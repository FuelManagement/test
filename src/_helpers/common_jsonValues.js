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
    value: "Downstream",
    label: "Downstream"
  },
 ],
  subCategory: [{
    value: "",
    label: "None",
    productCategory: ""
  }, 
  {
    value: "Crude Oil",
    label: "Crude Oil",
    productCategory: "Downstream"
  },
  {
    value: "Natural Gas",
    label: "Natural Gas",
    productCategory: "Downstream"
  }],
  measuringUnit: [{
    value: "",
    label: "None"
  }, 
  {
    value: "Cubic feet",
    label: "Cubic feet"
  }, 
  {
    value: "Barrels (bbl)",
    label: "Barrels (bbl)"
  }],
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
  userRole:[
    {_id:'0',role:"Adimin"},
    {_id:'1',role:"Level - 1"},
    {_id:'2',role:"Level - 2"},
    {_id:'3',role:"Supervisor"},

  ],
  screenName: [
    {_id:'0',role:"RFQ"},
    {_id:'1',role:"PO"},
    {_id:'2',role:"User Profile"},
    {_id:'3',role:"Supervisor"},
  ],

  orderTrackingDetails: {
    list: [
      {
        "poNumber": 20133,
        "productName": "Oil",
        "supplierName": "Energroup",
        "orderTrackingStatus": "Approved",
        "orderTrackingStatus": ""

      },
      {
        "poNumber": 20134,
        "productName": "Gas",
        "supplierName": "murali",
        "orderTrackingStatus": "Request Submitted",
        "orderTrackingStatus": ""
      },
      {
        "poNumber": 20135,
        "productName": "Gas",
        "supplierName": "Pemex",
        "orderTrackingStatus": "",
        "orderTrackingStatus": ""
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
      }],
     
  },
  blackChainTranHistory:[
    {
      "DeviceID" : "00098c006000",
      "TxnCode" : "TxnCode001",
      "TxnHash" : "TxnHash001",
      "ChannellID" : "ChannelID001",
      "BlockNo" : "BlkNo1",
      "Createtime" : "11/14/2019:10.00",
      "Age" : "5",
      "From" : "11/14/2019:10.00",
      "To" : "11/14/2019:10.05",
      "participantType":"Exporter1",
      "participantID" : "123",
      "UserId": "test1"
   },
   
    {
       "DeviceID" : "00098c007000",
       "TxnCode" : "TxnCode002",
       "TxnHash" : "TxnHash002",
       "ChannellID" : "ChannelID002",
       "BlockNo" : "BlkNo2",
       "Createtime" : "11/14/2019:10.05",
       "Age" : "10",
       "From" : "11/14/2019:10.05",
       "To" : "11/14/2019:10.15",
       "participantType":"Exporter2",
       "participantID" : "124",
       "UserId": "test1"
   },
   
    {
       "DeviceID" : "00098c008000",
       "TxnCode" : "TxnCode003",
       "TxnHash" : "TxnHash003",
       "ChannellID" : "ChannelID003",
       "BlockNo" : "BlkNo3",
       "Createtime" : "11/14/2019:10.30",
       "Age" : "5",
       "From" : "11/14/2019:10.30",
       "To" : "11/14/2019:10.35",
       "participantType":"Exporter3",
       "participantID" : "125",
       "UserId": "test1"
   },
  
    {
       "DeviceID" : "00098c009100",
       "TxnCode" : "TxnCode004",
       "TxnHash" : "TxnHash004",
       "ChannellID" : "ChannelID004",
       "BlockNo" : "BlkNo4",
       "Createtime" : "11/14/2019:11.00",
       "Age" : "20",
       "From" : "11/14/2019:11.00",
       "To" : "11/14/2019:11.20",
       "participantType":"Exporter4",
       "participantID" : "126",
       "UserId": "test1"
    },
    
     {
        "DeviceID" : "00098c009500",
        "TxnCode" : "TxnCode005",
        "TxnHash" : "TxnHash005",
        "ChannellID" : "ChannelID005",
        "BlockNo" : "BlkNo5",
        "Createtime" : "11/14/2019:11.35",
        "Age" : "10",
        "From" : "11/14/2019:11.35",
        "To" : "11/14/2019:11.45",
        "participantType":"Exporter5",
        "participantID" : "127",
        "UserId": "test1"
    }
   ]
}

module.exports = { Common_JsonData };
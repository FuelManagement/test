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
    Currency:[
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
    EntitryType:[
        {value:"Carrier (Mex)",label:'Carrier (Mex)'},
        {value:"Carrier (USA)",label:'Carrier (USA)'},
        {value:"Commercial",label:'Commercial'},
        {value:"Consortium (Support Admin)",label:'Consortium (Support Admin)'},
        {value:"Customs Agent",label:'Customs Agent'},
        {value:"End Buyer",label:'End Buyer'},
        {value:"Exporter",label:'Exporter'},
        {value:"Govt (Managerial)",label:'Govt (Managerial)'},
        {value:"Importer",label:'Importer'},
        {value:"Oil Well",label:'Oil Well'},
        {value:"Refinery",label:'Refinery'},
        {value:"Storage Tank (Mex)",label:'Storage Tank (Mex)'},
        {value:"Storage Tank (USA)",label:'Storage Tank (USA)'},
        {value:"Terminal (Mex)",label:'Terminal (Mex)'},
        {value:"Terminal (USA)",label:'Terminal (USA)'},
        {value:"Transloader (Mex)",label:'Transloader (Mex)'},
        {value:"Transloader (USA)",label:'Transloader (USA)'}, 
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
      },]
} 
// const DropdownData = {
//     productCategory: [{
//       value: "",
//       label: "None"
//     },
//     {
//       value: "prod1",
//       label: "prod1"
//     },
//     {
//       value: "prod2",
//       label: "prod2"
//     },],
//     subCategory: [{
//       value: "",
//       label: "None",
//       productCategory: ""
//     }, {
//       value: "Sub1Prod1",
//       label: "Sub1Prod1",
//       productCategory: "prod1"
//     }, {
//       value: "Sub2Prod1",
//       label: "Sub2Prod1",
//       productCategory: "prod1"
//     }, {
//       value: "Sub1Prod2",
//       label: "Sub1Prod2",
//       productCategory: "prod2"
//     }, {
//       value: "Sub2Prod2",
//       label: "Sub2Prod2",
//       productCategory: "prod2"
//     }, {
//       value: "Sub3Prod2",
//       label: "Sub3Prod2",
//       productCategory: "prod2"
//     },],
//     measuringUnit: [{
//       value: "",
//       label: "None"
//     }, {
//       value: "Litre",
//       label: "Litre"
//     }, {
//       value: "Barrel",
//       label: "Barrel"
//     }, {
//       value: "Gallon (US)",
//       label: "Gallon (US)"
//     },],
     
//   }
  
module.exports = { Common_JsonData  };
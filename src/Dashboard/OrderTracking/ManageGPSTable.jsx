import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config, history } from '../../_helpers';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
const recordsData = [
    {
        "orderid": 20133,
        "productName": "Oil",
        "customerName": "CFEnergia power",
        "status": "Approved",
        "date": "21/10/2019 03:00 PM"

    },
    {
        "orderid": 20134,
        "productName": "Gas",
        "customerName": "CFEnergia power",
        "status": "Approved",
        "date": "08/10/2019 10:00 AM"

    }
]
class ManageGPSTable extends React.Component{
    constructor(props){
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
        this.state={recordsDataValue :[], randomId:null,clickedItem:this.props.getClickedItem};
    }


    static getDerivedStateFromProps(nextProps, prevState){
        console.log("table props 1",nextProps);
        if(nextProps.dataItem.randomId != prevState.randomId){

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


            let obj = {customerName:nextProps.dataItem.formData.customername.value,
                orderid:nextProps.dataItem.formData.orderid.value,
                status:nextProps.dataItem.formData.action.value,
                date:datetime,
                id:nextProps.dataItem.randomId
                };

                nextProps.getAddedCallback("added data successfully");

            console.log("prev state",prevState);
            return { recordsDataValue : [...prevState.recordsDataValue,obj], randomId : nextProps.dataItem.randomId}
        }
        
        return null;
    }

    onClickItem(e, t, rowInfo){
        console.log("rowItem",rowInfo.original);
        this.state.clickedItem(rowInfo.original);
    }

    render(){
        return <div className='row form-wrapper react-table-border'>
             <ReactTable
                                data={this.state.recordsDataValue || []}
                                columns={Table_Config.ManageGPSTable.ManageGPSTableRecords.columns()}
                                {...Table_Config.ManageGPSTable.ManageGPSTableRecords.options}
                                getTrProps={(state, rowInfo, column) => {
                                    return {
                                        onClick: (e, t) => { this.onClickItem(e, t, rowInfo) },
                                        
                                    }
                                }}
                            />
            </div>
    }

}
export {ManageGPSTable}
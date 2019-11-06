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
        this.state={};
    }
    render(){
        return <div className='row form-wrapper react-table-border'>
             <ReactTable
                                data={recordsData || []}
                                columns={Table_Config.ManageGPSTable.ManageGPSTableRecords.columns()}
                                {...Table_Config.ManageGPSTable.ManageGPSTableRecords.options}
                            />
            </div>
    }

}
export {ManageGPSTable}
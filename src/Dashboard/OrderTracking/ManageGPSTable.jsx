import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config, history, formatutility } from '../../_helpers';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';

class ManageGPSTable extends React.Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
        this.state = { recordsDataValue: [], randomId: null, clickedItem: this.props.getClickedItem };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("table props 1", nextProps);
        // if (nextProps.dataItem.randomId != prevState.randomId) {
        if (nextProps.dataItem != undefined && nextProps.dataItem.length > 0) {

            //let array = [...prevState.recordsDataValue];
            let array = [];
            nextProps.dataItem.filter(option => option.status != "")
            .map(option => {
                var currentdate = new Date();

                let obj = {
                    customerName: option.customerParticipantName,
                    orderId: option.orderId,
                    status: option.status,
                    date: currentdate,
                    id: "nextProps.dataItem.randomId"
                };
                //nextProps.getAddedCallback("added data successfully");
    
                
                if (formatutility.isEmpty(array.find(f => f.orderId === obj.orderId && f.customerName === obj.customerName))) {
    
                    array.push(obj);
                }
                else {
                    array.find(f => f.orderId === obj.orderId && f.customerName === obj.customerName).status = obj.status;
                    array.find(f => f.orderId === obj.orderId && f.customerName === obj.customerName).date = obj.date;
                }
            })
            console.log("Array filtered data",array)            
            return { recordsDataValue: array, randomId: "nextProps.dataItem.randomId" }
        }

        return null;
    }

    onClickItem(e, t, rowInfo) {
        console.log("rowItem", rowInfo.original);
        this.state.clickedItem(rowInfo.original);
    }

    render() {
        return <div className='row form-wrapper react-table-border'>
            <div className="col-md-12">
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
        </div>
    }

}
export { ManageGPSTable }
import React from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Table_Config } from '../../_helpers'; 
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 
library.add(faPlus); 
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { purchaseOrdeActions } from '../../_actions'; 

class PurchaseOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal(event, data={}, mode="view") {
        this.setState({ rfqModal: !this.state.rfqModal, mode, selectedRfq: data });
        console.log("data");
        console.log(data);
        history.push('/rfq/edit', {data});
    }
    componentDidMount(){
        this.props.dispatch(purchaseOrdeActions.getAllPOList())
    }
    render() {
        let AllPOList=this.props.purchaseOrder.polist;
   
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h3 className="vendor-text" className="table-main-heading"> Purchase Orders</h3>
                <hr />
                <div>
                    <Link to="/rfq/add" className="addRFQ-link">
                        <button className="btn btn-outline btn-success">
                            <FontAwesomeIcon icon="plus" /> Purchase Order
                    </button>
                    </Link>
                    <div className="clearDiv"></div>
                    <br />
                    <ReactTable
                        data={AllPOList || []}
                        columns={Table_Config.PurchaseOrder.PurchaseOrders.columns({ toggleRfqModal: this.toggleModal.bind(this)})}
                        {...Table_Config.PurchaseOrder.PurchaseOrders.options}
                    />
                </div> 
            </div>
        )
    }
}
function mapStateToProps(state) { 
    const { purchaseOrder } = {...state};
    return { purchaseOrder };
}

const connectedRfq = connect(mapStateToProps)(PurchaseOrder);
export { connectedRfq as PurchaseOrder }; 
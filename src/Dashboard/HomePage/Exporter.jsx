import React from 'react';
import { connect } from 'react-redux';
import { exporterActions } from '../../_actions';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import { AutoComplete, DocumentModal } from '../../_components';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';

const css = {
    clearDiv: {
        "clear":"both"
    },
    textAlign: {
        "textAlign": "center"
    },
    width75:{
        "maxWidth":"75px"
    }
};

class HomePage_Exporter extends React.Component {

    constructor(props) {
        super(props);
        this.createRefineryPO = this.createRefineryPO.bind(this);
        this.bulkDispatchOrder = this.bulkDispatchOrder.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onCheckToDispatch = this.onCheckToDispatch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAllRefineres = this.getAllRefineres.bind(this);
        this.toggleDocumentModal = this.toggleDocumentModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            selectedOrders : {},
            modal:false,
            refineries: [],
            selectedToDispatch: [],
            search_co: "",
            search_pso: "",
            search_cso: "",
            search_dis: "",
            alertType: "",
            alertMessage: ""
        }
    }

    componentDidMount() {
        this.props.dispatch(exporterActions.getAllPo());
        this.props.dispatch(exporterActions.getAllToDispatch());
        this.props.dispatch(exporterActions.getAllPendingSupplierPO());
        this.props.dispatch(exporterActions.getAllDispatched());
        this.getAllRefineres();
    }

    componentDidUpdate(){
        $('.txn_id').popover();
    }

    createRefineryPO(event){
        event.preventDefault();
        let selectedOrders = this.state.selectedOrders;
        let keys = Object.keys(selectedOrders);
        for(let i=0; i < keys.length; i++){
            let row = selectedOrders[keys[i]];
            row.ImporterPONumber = String(row.PONumber);
            row.PONumber = String(row.input_PONumber);
            row.POFrom = row.input_POFrom;
            row.Price = row.input_Price;
            if (!row.PONumber || !row.POFrom || !row.price) {
                alert("All Fields are required");
                return false;
            }
            this.props.dispatch(exporterActions.createRefineryPO(row));
            delete selectedOrders[row.tx_id];
            this.setState({selectedOrders});
        }
        this.toggleModal();
    }

    toggleModal(event){
        this.setState({modal:!this.state.modal})
    }

    closeModal(e){
        this.setState({
            documentModal:false,
            alertType: "",
            alertMessage: ""
        })
    }

    handleChange(event, row){
        row[event.target.name] = event.target.value;
        let selectedOrders = {...this.state.selectedOrders}
        selectedOrders[row.tx_id] = row;
        this.setState({selectedOrders});
    }

    onCheck(event, row){
        let selectedOrders = {...this.state.selectedOrders};
        if(event.target.checked){
            row.input_PONumber = Math.floor(100000 + Math.random() * 900000)
            selectedOrders[row.tx_id] = row;
        } else {
            delete selectedOrders[row.tx_id];
        }
        this.setState({selectedOrders});
    }

    onCheckToDispatch(event, row){
        let selectedToDispatch = {...this.state.selectedToDispatch};
        if(event.target.checked){
            row.input_PONumber = Math.floor(100000 + Math.random() * 900000)
            selectedToDispatch[row.tx_id] = row;
        } else {
            delete selectedToDispatch[row.tx_id];
        }
        this.setState({selectedToDispatch});
    }

    bulkDispatchOrder(e){
        event.preventDefault();
        let selectedToDispatch = this.state.selectedToDispatch;
        let keys = Object.keys(selectedToDispatch);
        for(let i=0; i < keys.length; i++){
            let row = selectedToDispatch[keys[i]];
            this.props.dispatch(exporterActions.dispatchOrder(row));
            delete selectedToDispatch[row.tx_id];
            this.setState({selectedToDispatch});
        }
    }

    toggleDocumentModal(event, row, verifyOrders=false){
        if(!verifyOrders){
            this.setState({
                documentModal : true, 
                documents: row.documents,
                alertType: "",
                alertMessage: ""
            });
            return;
        }
        this.setState({
            documentModal : true, 
            documents: row.documents,
            alertType: "warning",
            alertMessage: "Checking for alterations . . ."
        });
        API_Helpers.verifyOrderAlterations(row)
        .then(res => {
            if(res) {
                this.setState({
                    alertType: "success",
                    alertMessage: "Quantity read from the document match the volumetric data and is within the threshold."
                })
            } else {
                this.setState({
                    alertType: "danger",
                    alertMessage: "Quantity read from the document does not match the volumetric data, please review. "
                })
            }            
        })
        .catch(err => {
            this.setState({
                alertType: "danger",
                alertMessage: typeof err === "string"? err:""
            })
        })
    }

    getAllRefineres(){
        return API_Helpers.getAllUsers()
        .then(users => {
            let refineries = []
            users.map(user => {
                if(user.role === "Refinery") refineries.push(user.email);
            })
            this.setState({ refineries })
        })
    }
    isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
    render() {
        const { exporters } = this.props;
        const { selectedOrders } = this.state;
        if(this.state.modal){
            $('#createPoModal').modal('show');
        } else{
            $('#createPoModal').modal('hide');
        }

        let orders_co = Utils.search(this.state.search_co, exporters.pendingOrders);
        let order_pso = Utils.search(this.state.search_pso, exporters.pendingSupplierOrders);
        let orders_cso = Utils.search(this.state.search_cso, exporters.pendingDispatch);
        let orders_dis = Utils.search(this.state.search_dis, exporters.dispatched);

        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2>Exporter</h2>
                <div>
                    <h4 className="inlineHeading"> New Customer Orders</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_co :e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <button className="btn btn-primary btn-sm col-md-offset-4 center link-bg button-style"
                    onClick={e => this.toggleModal(e)} 
                    disabled={this.isEmpty(this.state.selectedOrders)}>
                    Create PO
                </button>
                <ReactTable
                    data={orders_co}
                    columns={Table_Config.Exporter.newCustomerOrders.columns({onCheck:this.onCheck.bind(this), selectedValues: selectedOrders})}
                    {...Table_Config.Exporter.newCustomerOrders.options}
                />
                <br/>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Pending Orders from Supplier</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_pso :e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <ReactTable
                    data={order_pso}
                    columns={Table_Config.Exporter.pendingOrderFromSeller.columns}
                    {...Table_Config.Exporter.pendingOrderFromSeller.options}
                />
                <br/>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Orders Fulfilled by Supplier</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_cso :e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <button className="btn btn-primary btn-sm col-md-offset-4 link-bg button-style" 
                        onClick={e => this.bulkDispatchOrder(e)}
                        disabled={Object.keys(this.state.selectedToDispatch).length>0?false:"disabled"}
                        >
                    Dispatch
                </button>
                <ReactTable
                    data={orders_cso}
                    columns={Table_Config.Exporter.ordersFulfilled.columns({ 
                            onCheck:this.onCheckToDispatch.bind(this), 
                            selectedValues: this.state.selectedToDispatch,
                            toggleDocumentModal: this.toggleDocumentModal.bind(this)
                        })
                    }
                    {...Table_Config.Exporter.ordersFulfilled.options}
                />
                <br/>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Orders Fulfilled to Customer</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_dis :e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <ReactTable
                    data={orders_dis}
                    columns={Table_Config.Exporter.ordersFulfilledToCustomer.columns({
                        toggleDocumentModal: this.toggleDocumentModal.bind(this)
                    })}
                    {...Table_Config.Exporter.ordersFulfilledToCustomer.options}
                />
                <div className="modal" tabIndex="-1" role="dialog" id="createPoModal" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Orders</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={e => this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                { Object.keys(selectedOrders).length && Object.keys(selectedOrders).map((key, idx) => 
                                   <div className="card bg-light mb-3" key={idx}>
                                        <div className="card-header header-bold">Customer PO #{selectedOrders[key].PONumber}</div> 
                                        <div className="card-body">
                                            <form autoComplete="off">
                                                <div className="form-row">
                                                    <div className="col-md-6 mb-6">
                                                        <label className="header-bold" htmlFor="validationDefault01">Customer Name</label>
                                                        <input type="text"  readOnly={true} 
                                                            value={selectedOrders[key].User_ID}
                                                            className="form-control" 
                                                            id="CustomerName" 
                                                            name="CustomerName" />
                                                    </div>
                                                    <div className="col-md-6 mb-6">
                                                        <label className="header-bold" htmlFor="validationDefault01">Date</label>
                                                        <input type="text" 
                                                            readOnly={true} 
                                                            value={selectedOrders[key].timestamp.slice(0,9)}
                                                            className="form-control" 
                                                            id="CustomerPODate" 
                                                            name="CustomerPODate" />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6 mb-6">
                                                        <label  className="header-bold"  htmlFor="validationDefault01">Product</label>
                                                        <input type="text" readOnly={true} 
                                                            value={selectedOrders[key].product}
                                                            className="form-control" 
                                                            id="POProduct" 
                                                            name="POProduct" />
                                                    </div>
                                                    <div className="col-md-6 mb-6">
                                                        <label  className="header-bold"  htmlFor="validationDefault01">Quantity (Gallons)</label>
                                                        <input type="text" 
                                                            readOnly={true} 
                                                            value={selectedOrders[key].quantity}
                                                            className="form-control" 
                                                            id="POQuantity" 
                                                            name="POQuantity" />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6 mb-3">
                                                        <label  className="header-bold"  htmlFor="validationDefault01">Customer Price ($)</label>
                                                        <input type="text" readOnly={true} 
                                                            value={selectedOrders[key].price}
                                                            className="form-control" 
                                                            id="POPrice" 
                                                            name="POPrice" />
                                                    </div>
                                                </div>
                                                <div style={css.clearDiv}></div>
                                                <div className="form-row">
                                                    <div className="col-md-6 mb-3">
                                                        <label  className="header-bold"  htmlFor="validationDefault01">Supplier PO #</label>
                                                        <input type="text" 
                                                            className="form-control" 
                                                            id="PONumber" 
                                                            name="input_PONumber"
                                                            value={selectedOrders[key].input_PONumber}
                                                            readOnly={true}
                                                            onChange={e=>this.handleChange(e, selectedOrders[key])} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label  className="header-bold" htmlFor="validationDefault01">Supplier Name</label>
                                                        <AutoComplete suggestions={this.state.refineries} name="input_POFrom" autocomplete="off"
                                                        onValueChange={this.handleChange} selectedOrder={selectedOrders[key]}/>
                                                    </div>
                                                </div>
                                                <div style={css.clearDiv}></div>
                                                <div className="form-row">
                                                       <div className="col-md-6 mb-3">
                                                        <label  className="header-bold" htmlFor="validationDefault02">Supplier Price</label>
                                                        <input type="text" 
                                                            className="form-control"
                                                            id="Price" 
                                                            name="input_Price" 
                                                            onChange={e=>this.handleChange(e, selectedOrders[key])} />
                                                    </div>
                                                </div>
                                                <div style={css.clearDiv}></div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary button-style" onClick={ e => this.createRefineryPO(e)} >Create</button>
                                <button type="button" className="btn btn-secondary" onClick={e => this.toggleModal(e)} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
           
                <DocumentModal 
                    show={this.state.documentModal} 
                    files={this.state.documents} 
                    closeModal={this.closeModal}
                    alertType={this.state.alertType}
                    alertMessage={this.state.alertMessage}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { exporters, authentication } = state;
    const { user } = authentication;
    return {
        user,
        exporters
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage_Exporter);
export { connectedHomePage as HomePage_Exporter };

import React from 'react';
import { connect } from 'react-redux';
import { refineryActions } from '../../_actions';
import { DocumentModal } from '../../_components';
import { Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';

class HomePage_Refinery extends React.Component {

    constructor(props) {
        super(props);
        this.bulkDispacthOrders = this.bulkDispacthOrders.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleDocumentModal = this.toggleDocumentModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            selectedOrders : {},
            modal:false,
            documentModal: false,
            documents: [],
            search_do: "",
            search_po: ""
        }
    }

    componentDidUpdate(){
        $('.txn_id').popover();
    }
    componentDidMount() {
        this.props.dispatch(refineryActions.getAllToDispatch());
        this.props.dispatch(refineryActions.getAllDispatchedOrders());
    }

    toggleDocumentModal(event, row){
        this.setState({documentModal : !this.documentModal, documents: row.documents});
    }

    closeModal(e){
        this.setState({documentModal: false});
    }

    bulkDispacthOrders(event){
        event.preventDefault();
        let selectedOrders = this.state.selectedOrders;
        let keys = Object.keys(selectedOrders);
        for(let i=0; i < keys.length; i++){
            let row = selectedOrders[keys[i]];
            if (!row.input_Document) {
                alert("File not selected");
                return false;
            }
            this.props.dispatch(refineryActions.dispatchOrder(row));
            delete selectedOrders[row.tx_id];
            this.setState({selectedOrders});
        }
        this.toggleModal();
    }

    handleChange(event, row){
        row[event.target.name] = event.target.files;
        let selectedOrders = {...this.state.selectedOrders}
        selectedOrders[row.tx_id] = row;
        this.setState({selectedOrders});
    }

    toggleModal(event){
        this.setState({modal:!this.state.modal})
    }

    onCheck(event, row){
        let selectedOrders = {...this.state.selectedOrders};
        if(event.target.checked){
            selectedOrders[row.tx_id] = row;
        } else {
            delete selectedOrders[row.tx_id];
        }
        this.setState({selectedOrders});
    }

    render() {
        const { refinerys } = this.props;
        const { selectedOrders } = this.state;
        if(this.state.modal){
            $('#createPoModal').modal('show');
        } else {
            $('#createPoModal').modal('hide');
        }

        let orders_po = Utils.search(this.state.search_po, refinerys.pendingDispatch);
        let orders_do = Utils.search(this.state.search_do, refinerys.dispatchedOrders);

        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2>Refinery</h2>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Pending Orders</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_po:e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <button className="btn btn-primary btn-sm col-md-offset-4 center link-bg button-style"
                    onClick={e => this.toggleModal(e)} 
                    disabled={Object.keys(this.state.selectedOrders).length>0?false:"disabled"}>
                    Dispatch
                </button>
                <br/>
                <ReactTable
                    data={orders_po}
                    columns={Table_Config.Refinery.pendingOrders.columns({onCheck:this.onCheck.bind(this), selectedValues: this.state.selectedOrders})}
                    {...Table_Config.Refinery.pendingOrders.options}
                />
                <br/>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Fulfilled Orders</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search_do:e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <hr/>
                <ReactTable
                    data={orders_do}
                    columns={Table_Config.Refinery.dispatchedOrders.columns({toggleDocumentModal: this.toggleDocumentModal.bind(this)})}
                    {...Table_Config.Refinery.dispatchedOrders.options}
                />
                
                <div className="modal" tabIndex="-1" role="dialog" id="createPoModal" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Fulfill Order</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={e => this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                { Object.keys(selectedOrders).length && Object.keys(selectedOrders).map((key, idx) => 
                                   <div className="card bg-light mb-3" key={idx}>
                                        <div className="card-header header-bold">Customer PO #{selectedOrders[key].PONumber}</div> 
                                        <div className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <div className="col-md-6 mb-6">
                                                        <label  className="header-bold" htmlFor="validationDefault01">Customer Name</label>
                                                        <input type="text"  readOnly={true} 
                                                            value={selectedOrders[key].User_ID}
                                                            className="form-control" 
                                                            id="CustomerName" 
                                                            name="CustomerName" />
                                                    </div>
                                                    <div className="col-md-6 mb-6">
                                                        <label  className="header-bold" htmlFor="validationDefault01">Date</label>
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
                                                        <label  className="header-bold" htmlFor="validationDefault01">Product</label>
                                                        <input type="text" readOnly={true} 
                                                            value={selectedOrders[key].product}
                                                            className="form-control" 
                                                            id="POProduct" 
                                                            name="POProduct" />
                                                    </div>
                                                    <div className="col-md-6 mb-6">
                                                        <label  className="header-bold" htmlFor="validationDefault01">Quantity (Gallons)</label>
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
                                                        <label  className="header-bold" htmlFor="validationDefault01">Customer Price ($)</label>
                                                        <input type="text" readOnly={true} 
                                                            value={selectedOrders[key].price}
                                                            className="form-control" 
                                                            id="POPrice" 
                                                            name="POPrice" />
                                                    </div>
                                                </div>
                                                <div className="clearDiv"></div>
                                                <div className="form-row">
                                                       <div className="col-md-12 mb-3">
                                                        <label  className="header-bold" htmlFor="document">Document</label>
                                                        <input type="file"
                                                            className="form-control"
                                                            id="document" 
                                                            name="input_Document"
                                                            multiple={true}
                                                            onChange={e=>this.handleChange(e, selectedOrders[key])} />
                                                    </div>
                                                </div>
                                                <div className="clearDiv"></div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary button-style" onClick={ e => this.bulkDispacthOrders(e)} >Fulfill</button>
                                <button type="button" className="btn btn-secondary" onClick={e => this.toggleModal(e)} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
               
                <DocumentModal show={this.state.documentModal} files={this.state.documents} closeModal={this.closeModal}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { refinerys, authentication } = state;
    const { user } = authentication;
    return {
        user,
        refinerys
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage_Refinery);
export { connectedHomePage as HomePage_Refinery };

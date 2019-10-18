import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { AutoComplete } from '../../_components';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';

class HomePage_Importer extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAllExporters = this.getAllExporters.bind(this);
        this.toggleModal - this.toggleModal.bind(this);
        this.state = {
            exporters: [],
            search: "",
            createPoModal: false
        }
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAllPo());
        $('.txn_id').popover();
        this.getAllExporters();
    }

    componentDidUpdate(){
        $('.txn_id').popover();
        if(this.props.users && this.props.users.resetForm)
            $('#createPoForm')[0].reset();
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        return this.props.dispatch(userActions.createPo(data));
    }

    getAllExporters(){
        return API_Helpers.getAllUsers()
        .then(users => {
            let exporters = []
            users.map(user => {
                if(user.role === "Exporter") exporters.push(user.email);
            })
            this.setState({ exporters })
        })
    }

    toggleModal(event){
        if(this.state.createPoModal){
            $('#createPoForm input[type="text"]').val("");
        }
        this.setState({createPoModal:!this.state.createPoModal})
    }

    render() {
        const { users, loading } = this.props;
        let orders = Utils.search(this.state.search, this.props.users.items);
        if(this.state.createPoModal){
            $('#createPoModal').modal('show');
        } else{
            $('#createPoModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{display:"inline-block"}}>
                    Importer
                </h2>
                <button className="btn btn-primary btn-sm col-md-offset-4 center link-bg button-style offset-8"
                        onClick={e => this.toggleModal(e)} >
                        Create PO
                </button>
                <hr/>
                <div>
                    <h4 className="inlineHeading"> Order Status</h4>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search:e.target.value})} 
                        placeholder="Search By PO #" />
                </div>
                <div className="clearDiv"></div>
                <br/>
                <ReactTable
                    data={orders}
                    columns={Table_Config.Importer.orders.columns}
                    {...Table_Config.Importer.orders.options}
                />

                <hr/>
                <br/>

                <div className="modal" id="createPoModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Order</h5>
                                <button type="button" className="close" onClick={(e)=>this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} id="createPoForm" autoComplete="off">
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3 ">
                                            <label className="header-bold" htmlFor="validationDefault01">PO #</label>
                                            <input type="text" className="form-control" id="validationDefault01" readOnly={true}
                                                placeholder="#Purchase Order" name="PONumber" value={Math.floor(100000 + Math.random() * 900000)} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault02">Date</label>
                                            <input type="text" className="form-control" id="validationDefault02" placeholder="Date"
                                                value={new Date().getMonth()+1 +'-'+ new Date().getDate() +'-'+new Date().getFullYear()} required  readOnly={true} name="Date" />
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    <br/>
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="POFrom">Supplier Name</label>
                                            <AutoComplete suggestions={this.state.exporters} name="POFrom" autocomplete="off"/>

                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="Product">Product</label>
                                            <AutoComplete suggestions={[
                                                "Petrol", "Diesel", "Jet Fuel"
                                            ]} name="Product" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    <br/>
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="Quantity">Quantity</label>
                                            <input type="text" className="form-control" placeholder="Quantity in Gallons"
                                                name="Quantity" required={true} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="Price">Price</label>
                                            <input type="text" className="form-control" placeholder="Price in $"
                                                name="Price" required={true}/>
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    <br/>
                                    <div className="offset-7">
                                        <button className="btn btn-default" 
                                            type="reset" onClick={e => this.toggleModal(e)}>
                                            Cancel
                                        </button>
                                        <button className="btn btn-primary link-bg button-style" 
                                            type="submit" disabled={loading}>
                                            Create PO
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage_Importer);
export { connectedHomePage as HomePage_Importer };

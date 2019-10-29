import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { onboardActions } from '../../_actions';

class OnBoard_Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            createBoardModal: false,
            domain:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    componentDidMount() {
       
        this.props.dispatch(onboardActions.getAllOnBoarder());  
    }

    shouldComponentUpdate(){
        return true;
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        return this.props.dispatch(onboardActions.createOnBoarder(data,this.props.onboard.participants));
    }
    toggleModal(event){
        if(this.state.createBoardModal){
            $('#createBoardForm input[type="text"]').val("");
        }
        this.setState({createBoardModal:!this.state.createBoardModal})
    }

    render() {
        const { loading} = this.props.onboard;
        //let participantList = Utils.search(this.state.search, this.props.onboard.participants);
        if(this.state.createBoardModal){
            $('#createBoardModal').modal('show');
        } else{
            $('#createBoardModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{display:"inline-block"}}>
                    Organization
                </h2>
                
                <hr/>
                <div>
                <button className="btn btn-primary btn-sm col-md-offset-4 center link-bg button-style"
                        onClick={e => this.toggleModal(e)} >
                        Create
                </button>
                    <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search:e.target.value})} 
                        placeholder="Search By Name" />
                </div>
                <div className="clearDiv"></div>
                <br/>
                <ReactTable
                    data={this.props.onboard.participants}
                    columns={Table_Config.Boarder.participants.columns}
                   
                      {...Table_Config.Boarder.participants.options}
                />

                <hr/>
                <br/>

                <div className="modal" id="createBoardModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">Register New Participant</h5>
                                <button type="button" className="close" onClick={(e)=>this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} id="createBoardForm" autoComplete="off">
                                    <div className="form-row">
                                        <div className="col-md-6 mb-3 ">
                                            <label className="header-bold" htmlFor="validationDefault01">Organization</label>
                                            <input type="text" className="form-control" id="validationDefault01" readOnly={false}
                                                placeholder="Organization" name="OrganizationName"  />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault02">Participant Type</label>
                                            <select className="form-control" id="validationDefault02" name="ParticipantType">
                                                <option value="Exporter">Exporter</option>
                                                <option value="Importer">Importer</option>
                                                <option value="Refinary">Refinery</option>
                                            </select>
                                             </div>
                                    </div>
                                    
                                    <div className="clearDiv"></div>
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault04">Street Address</label>
                                            <input type="text" className="form-control" id="validationDefault04" readOnly={false}
                                                placeholder="Street Address" name="StreetAddress"  />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault05">City</label>
                                            <input type="text" className="form-control" id="validationDefault05" readOnly={false}
                                                placeholder="City" name="City"  />
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault06">State</label>
                                            <input type="text" className="form-control" id="validationDefault06" readOnly={false}
                                                placeholder="State" name="State"  />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault07">Zip Code</label>
                                            <input type="text" className="form-control" id="validationDefault07" readOnly={false}
                                                placeholder="Zip Code" name="ZipCode"  />
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault08">Country</label>
                                            <input type="text" className="form-control" id="validationDefault08" readOnly={false}
                                                placeholder="Country" name="Country"  />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault09">Domain</label>
                                            <input type="text" className="form-control" id="validationDefault09" readOnly={false}
                                                placeholder="Domain" name="Domain" value={this.state.domain}  onChange={e => this.setState({domain:e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                    <label className="header-bold" htmlFor="validationDefault11">Phone</label>
                                            <input type="text" className="form-control" id="validationDefault11" readOnly={false}
                                                placeholder="Phone" name="Phone"  />
                                           
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            
                                                 <label className="header-bold" htmlFor="validationDefault13">Tax ID</label>
                                            <input type="TaxId" className="form-control" id="validationDefault13" readOnly={false}
                                                placeholder="TaxId" name="TaxId"  />
                                        </div>
                                        </div>
                                    <div className="form-row">
                                    <div className="col-md-12 mb-6">
                                    <h5 className="modal-title">Owner Details</h5>
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault10">First Name</label>
                                            <input type="text" className="form-control" id="validationDefault10" readOnly={false}
                                                placeholder="First Name" name="FirstName"  />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault11">Last Name</label>
                                            <input type="text" className="form-control" id="validationDefault11" readOnly={false}
                                                placeholder="Last Name" name="LastName"  />
                                        </div>
                                    </div>
                                    <div className="clearDiv"></div>
                                    
                                    
                                    <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                    <label className="header-bold" htmlFor="validationDefault12">Email/User ID</label>
                                            <input type="text" className="form-control" id="validationDefault12" readOnly={false}
                                                placeholder="Email" name="Email"  />
                                           
                                        </div>
                                        {/*
                                        <div className="col-md-6 mb-3">
                                            <label className="header-bold" htmlFor="validationDefault13">Password</label>
                                            <input type="password" className="form-control" id="validationDefault13" readOnly={false}
                                                placeholder="Password" name="Password"  />
                                        </div>
                                */}
                                    </div>
                                    
                                    <div className="clearDiv"></div>
                                    
                                    <div className="offset-7">
                                        <button className="btn btn-default" 
                                            type="reset" onClick={e => this.toggleModal(e)}>
                                            Cancel
                                        </button>
                                        <button className="btn btn-primary link-bg button-style" 
                                            type="submit" disabled={loading}>
                                            Create
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
        return {
        onboard:state.onboard
      
    };
}

const connectedBoarder = connect(mapStateToProps)(OnBoard_Admin);
export { connectedBoarder as OnBoard_Admin };

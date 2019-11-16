import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { LineItem } from '../../_components/LineItem';
import { rfqActions } from '../../_actions';
library.add(faAngleLeft, faPlus); 
import {Common_JsonData} from '../../_helpers';
import ProductList from '../../_components/MapRFQProduct/productList';

class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEntityChange = this.handleEntityChange.bind(this);
        this.postNewRfq = this.postNewRfq.bind(this);
        this.getEntityTypes = this.getEntityTypes.bind(this);
        this.filterParticipants = this.filterParticipants.bind(this);      
        this.mapSelectedRfqFormData = this.mapSelectedRfqFormData.bind(this);
        this.updateLineItems = this.updateLineItems.bind(this);
        this.state = {
            formData: props.row && Object.keys(props.row).length ? props.row : {},
            participants: props.rfq.participants || [],
            entityTypes: this.getEntityTypes(props.rfq.participants) || [{ value: "", label: "None" }],
            selectedRfq: this.props.history
                && this.props.history.location
                && this.props.history.location.state
                && this.props.history.location.state.data
        }
    }
    componentDidMount() {
        this.props.dispatch(rfqActions.getAllProducts());
        this.props.dispatch(rfqActions.getAllParticipant());
        setTimeout(()=>this.mapSelectedRfqFormData(), 3000);
    }
    UNSAFE_componentWillReceiveProps() {
        console.log(this.props.rfq.participants);
        if (this.props.rfq.participants && this.props.rfq.participants.length) {
            this.setState({
                entityTypes: this.getEntityTypes(this.props.rfq.participants),
                participants: this.props.rfq.participants
            });
        }
    }
    _setParticipandId(participants, participantName){
        let tmp = participants.filter(p=> participantName === p.domain)
        return (tmp.length) ? tmp[0].registerId : false;
    }
    mapSelectedRfqFormData() {
        if (!this.state.selectedRfq) return;
        let formData = this.state.formData; 
        formData.entityType = this.state.selectedRfq.entityType || formData.entityType;
        let participants = this.filterParticipants(formData.entityType);

        formData.status = this.state.selectedRfq.status || formData.status;
        formData.startTime = this.state.selectedRfq.startTime || formData.startTime;
        formData.endTime = this.state.selectedRfq.endTime || formData.endTime;
        formData.toUserId = this._setParticipandId(participants, this.state.selectedRfq.participant_name) || formData.participantID;
        formData.projectDetails = this.state.selectedRfq.projectDetails || formData.projectDetails;
        formData.rfqID = this.state.selectedRfq.rfqID || formData.rfqID;
        formData.currency = this.state.selectedRfq.currency || formData.currency;        
        formData.participant_name =  this.state.selectedRfq.participant_name ||formData.participant_name ;
        formData.products = this.state.selectedRfq.products;
        this.setState({ formData });
        
        
    }
    postNewRfq() {
        if(this.state.selectedRfq){
            console.log('1. I am in update');
            let formData = this.state.formData; 
            this.props.dispatch(rfqActions.updateRfq(formData));
        }
        else{
            console.log('1. I am in update');
            let formData = this.state.formData; 
            this.props.dispatch(rfqActions.postNewRfq(formData));
        }
    }
    updateLineItems(products) {
        console.log('updateLineItems')
        let formData = this.state.formData;
        formData.products = products;
        console.log(formData);
        this.setState({ formData });
    }
    getEntityTypes(participants = []) {
        let entityTypes = {};
        participants.map(participant => {
            if (participant.participantType)
                entityTypes[participant.participantType] = participant.participantType;
        })
        let types = Object.keys(entityTypes).map(type => ({ value: type, label: type }));
        return types.length ? types : false;
    }
    filterParticipants(participantType) {
        let participants = this.props.rfq && this.props.rfq.participants || [];
        participants = participants.filter(participant => participant.participantType === participantType);
        this.setState({ participants });
        return participants;
    }
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        if (event.target.name === "participantID") {
            let formData = this.state.formData;
            let participantName = this.state.participants.find(f => f.registerId.toLowerCase() === event.target.value.toLowerCase()).domain;
            formData.participant_name =  participantName;
        }
        let formData = { ...this.state.formData };
        formData[key] = value;
        this.setState({ formData });
    }
    handleEntityChange(event) {
        this.handleChange(event);
        this.filterParticipants(event.target.value);
    }
    render() {
        //const { mode = "edit", rfq = {} } = this.props;
        const { rfq = {} } = this.props;
        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3>
                            <Link to="/rfq"> <FontAwesomeIcon icon="angle-left" /></Link>
                            &nbsp;&nbsp;&nbsp;{this.state.selectedRfq ? "Update" : "Create"} RFQ
                        </h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="rfqID"
                                        label="Projet ID"
                                        value={this.state.formData.rfqID || ""}
                                        onChange={this.handleChange}
                                        name="rfqID"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id="entityType"
                                        label="Entity Type"
                                        value={this.state.formData.entityType || ""}
                                        onChange={this.handleEntityChange}
                                        name="entityType"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    >
                                        {this.state.entityTypes.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id='participantID'
                                        variant="outlined"
                                        name='participantID'
                                        label="Organisation Name"
                                        value={this.state.formData.participantID || ""}
                                        className="form-control"
                                        onChange={this.handleChange}
                                        margin="dense"
                                    >
                                        {this.state.participants && this.state.participants.map(option => (
                                            <MenuItem key={option.registerId} value={option.registerId}>
                                                {option.domain}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="row fom-row">
                                <div className="col-md-12 mb-3  ">
                                    <TextField
                                        id="projectDetails"
                                        label="Project Details"
                                        value={this.state.formData.projectDetails || ""}
                                        onChange={this.handleChange}
                                        name="projectDetails"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="startTime"
                                        name="startTime"
                                        label="Start Time"
                                        type="datetime-local"
                                        value={this.state.formData.startTime || ""}
                                        onChange={this.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="endTime"
                                        name="endTime"
                                        label="End Time"
                                        type="datetime-local"
                                        value={this.state.formData.endTime || ""}
                                        onChange={this.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="status"
                                        label="Status"
                                        value={this.state.formData.status || "Created"}
                                        onChange={this.handleChange}
                                        name="status"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="activationTime"
                                        name="activationTime"
                                        label="Activation Time"
                                        type="datetime-local"
                                        value={this.state.formData.startTime || ""}
                                        onChange={() => false}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 addrfq-dateTime ">
                                    <TextField
                                        id="closerTime"
                                        name="closerTime"
                                        label="Closer Time"
                                        type="datetime-local"
                                        value={this.state.formData.endTime || ""}
                                        onChange={() => false}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        select
                                        id="currency"
                                        label="Currency"
                                        value={this.state.formData.currency || ""}

                                        // value={this.state.controls.currency.value}
                                        onChange={this.handleChange}
                                        name="currency"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    >
                                        {Common_JsonData.Currency && Common_JsonData.Currency.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="row form-row mb-3">
                                <div className="col-md-12">
                                    <ProductList products={this.state.formData.products || []} productCallback={this.updateLineItems.bind(this)} productDetailList={this.props.rfq.products.products} />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-7"></div>
                                <div className="col-md-4 mb-3 ">
                                    <button className="btn btn-success rfq-submit-btn float-right"
                                        onClick={(e) => this.postNewRfq()}>
                                            {this.state.selectedRfq ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rfq } = state;
    return { rfq };
}

const connectedRfq = connect(mapStateToProps)(AddRFQ);
export { connectedRfq as AddRFQ };
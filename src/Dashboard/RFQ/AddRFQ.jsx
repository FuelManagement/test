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
const currencytype = [
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
        label: "Maxecian Peso (MXN)"
    },
];
class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEntityChange = this.handleEntityChange.bind(this);
        this.postNewRfq = this.postNewRfq.bind(this);
        this.handleLineItemChange = this.handleLineItemChange.bind(this);
        this.getEntityTypes = this.getEntityTypes.bind(this);
        this.filterParticipants = this.filterParticipants.bind(this);
        this.updateLineItems = this.updateLineItems.bind(this);
        this.mapSelectedRfqFormData = this.mapSelectedRfqFormData.bind(this);
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
        this.mapSelectedRfqFormData();
    }
    UNSAFE_componentWillReceiveProps() {
        if (this.props.rfq.participants && this.props.rfq.participants.length) {
            this.setState({
                entityTypes: this.getEntityTypes(this.props.rfq.participants),
                participants: this.props.rfq.participants
            });
        }
    }
    mapSelectedRfqFormData() {
        if (!this.state.selectedRfq) return;
        let formData = this.state.formData;
        formData.entityType = this.state.selectedRfq.entityType || formData.entityType;
        formData.status = this.state.selectedRfq.status || formData.status;
        formData.startTime = this.state.selectedRfq.startTime || formData.startTime;
        formData.endTime = this.state.selectedRfq.endTime || formData.endTime;
        formData.participantID = this.state.selectedRfq.participantID || formData.participantID;
        formData.projectDetails = this.state.selectedRfq.projectDetails || formData.projectDetails;
        formData.projectId = this.state.selectedRfq.projectID || formData.projectID;
        formData.currency = this.state.selectedRfq.currency || formData.currency;
        console.log("formData");
        console.log(formData);

        this.setState({ formData });

    }
    postNewRfq() {
        let formData = this.state.formData;
        formData.toUserID = this.state.participants.find(f => f._id === this.state.formData.participantID).registerId;
        formData.participant_name = this.state.participants.find(f => f._id === this.state.formData.participantID).domain;
        this.props.dispatch(rfqActions.postNewRfq(formData));
    }
    updateLineItems(lineItems) {
        let formData = this.state.formData;
        formData.products = lineItems;
        this.setState({ formData });
    }
    getEntityTypes(participants = []) {
        let entityTypes = {};
        participants.map(participant => {
            if (participant.entityType)
                entityTypes[participant.entityType] = participant.entityType;
        })
        let types = Object.keys(entityTypes).map(type => ({ value: type, label: type }));
        return types.length ? types : false;
    }
    filterParticipants(entityType) {
        let participants = this.props.rfq && this.props.rfq.participants || [];
        participants = participants.filter(participant => participant.entityType === entityType);
        this.setState({ participants });
    }
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        let formData = { ...this.state.formData };
        formData[key] = value;
        this.setState({ formData });
    }
    handleEntityChange(event) {
        this.handleChange(event);
        this.filterParticipants(event.target.value);
    }
    handleLineItemChange(product, index) {
        let formData = { ...this.state.formData };
        this.setState({ formData });
    }
    render() {
        const { mode = "edit", rfq = {} } = this.props;
        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3><Link to="/rfq"> <FontAwesomeIcon icon="angle-left" /></Link> &nbsp;&nbsp;&nbsp;{this.state.selectedRfq ? "Update" : "Add"} RFQ</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="projectId"
                                        label="Projet ID"
                                        value={this.state.formData.projectId || ""}
                                        onChange={this.handleChange}
                                        name="projectId"
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
                                            <MenuItem key={option._id} value={option.domain}>
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
                                        defaultValue={this.state.formData.startTime || ""}
                                        value={this.state.formData.startTime}
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
                                        {currencytype.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="row form-row mb-3">
                                <div className="col-md-12">
                                    <LineItem products={rfq.products} updateLineItems={this.updateLineItems} />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-7"></div>
                                <div className="col-md-4 mb-3 ">
                                    <button className="btn btn-success rfq-submit-btn float-right" onClick={(e) => this.postNewRfq()}>Submit</button>
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
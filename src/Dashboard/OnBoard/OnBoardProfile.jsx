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
import RegisterationStepper from '../../RegisterPage/RegisterationStepper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TextField } from '@material-ui/core';
import Locations from '../../_components/Location/Location';

class OnBoard_Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            createParticipantModal: false,
            domain: '',
            mode: this.props.onboard.mode !== undefined ? this.props.onboard.mode : 'create'
        }

        this.toggleModal = this.toggleModal.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextprops) {
        if (JSON.stringify(this.props.onboard.mode) !== JSON.stringify(nextprops.onboard.mode)) {
            this.setState({ mode: nextprops.onboard.mode })
        }
    }
    componentDidMount() {

        this.props.dispatch(onboardActions.getAllParticipant());
    }

    shouldComponentUpdate() {
        return true;
    }

    toggleModal(event) {
        if (this.state.createParticipantModal) {
            $('#createParticipantModal input[type="text"]').val("");
        }
        this.setState({ createParticipantModal: !this.state.createParticipantModal })
    }
    toggleParticipantModal(e, data, mode) {
        if (this.state.createParticipantModal) {
            $('#createParticipantModal input[type="text"]').val("");
        }
        this.props.dispatch(onboardActions.changeModeParticipant(mode));
        this.props.dispatch(onboardActions.changeFormState('isOrgFormVaild',true));
        this.props.dispatch(onboardActions.changeFormState('isAccountFormVaild',true));
        this.props.dispatch(onboardActions.changeFormState('isTaxFormVaild',true));
        this.props.dispatch(onboardActions.changeFormState('isContactFormVaild',true));
        this.props.dispatch(onboardActions.changeFormState('isFormValid',true));
        this.props.dispatch(onboardActions.getParticipant(data));
        this.setState({ createParticipantModal: !this.state.createParticipantModal });
    }
    approveParticipant(e, data, action) {
        this.props.dispatch(onboardActions.approveParticipant(data, action));
    }
    render() {
        //const { loading,product,products,mode} = this.props.product;
        if (this.state.createParticipantModal) {
            $('#createParticipantModal').modal('show');
        } else {
            $('#createParticipantModal').modal('hide');
        }
        return (
            <div className="col-md-9 contentDiv" style={{ left: "22%" }}>
                <h2 style={{ display: "inline-block" }}>
                    On-boarding - Profile Setup
                </h2>

                <hr />
                <div>

                    <button name="btnAddParticipant" className="btn btn-outline btn-success" onClick={e => { this.toggleModal(e); this.props.dispatch(onboardActions.changeModeParticipant('create')); }}>
                        <FontAwesomeIcon icon="plus" /> On-boarding Profile
                    </button>
                    <TextField className="searchBox"
                        type="text" name="searc"
                        value={this.state.search}
                        label="Search By Organization Name"
                        onChange={e => this.setState({ search: e.target.value })}
                        variant="outlined"
                        margin="dense"
                    />
                    {/* <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search:e.target.value})} 
                        placeholder="Search By Name" /> */}
                </div>
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.props.onboard.participants}
                    columns={Table_Config.Participant.participants.columns({
                        toggleParticipantModal: this.toggleParticipantModal.bind(this),
                        approveParticipant: this.approveParticipant.bind(this)
                    })}
                    {...Table_Config.Participant.participants.options}
                />

                <hr />
                <br />

                <div className="modal onboard-profile" id="createParticipantModal" tabIndex="-1" role="dialog">
                    {this.state.createParticipantModal ? <div className="modal-dialog " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">{this.state.mode === 'create' ? 'Add' : 'Edit'} Participant</h5>
                                <button type="button" className="close" onClick={(e) => this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* <ProductForm mode={this.state.mode} closeModal={this.toggleModal}/> */}
                                <RegisterationStepper />
                            </div>
                        </div>
                    </div> : null}
                </div>
                <Locations location={[{ lat:59.955413, lng:30.337844},{ lat:59.955513, lng:30.337844}]} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { onboard } = state;

    return {
        onboard

    };
}

const connectedOnBoardProfile = connect(mapStateToProps)(OnBoard_Profile);
export { connectedOnBoardProfile as OnBoardProfile };

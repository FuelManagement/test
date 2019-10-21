import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { rfqActions } from '../../_actions';
class RFQ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            rfqModal: false,
            mode: 'view',
            selectedRfq: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(rfqActions.getAllRfq());
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        return this.props.dispatch(rfqActions.updateRfq(data));
    }
    toggleModal(event, data={}, mode="view") {
        this.setState({ rfqModal: !this.state.rfqModal, mode, selectedRfq: data })
    }
    render() {
        if (this.state.rfqModal) {
            $('#rfqModal').modal('show');
        } else {
            $('#rfqModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{ display: "inline-block" }}>RFQs</h2>
                <hr />
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.props.rfq.rfqs}
                    columns={Table_Config.Rfq.rfqs.columns({toggleRfqtModal: this.toggleModal.bind(this)})}
                    {...Table_Config.Rfq.rfqs.options}
                />
                <hr />
                <div className="modal" id="rfqModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">{this.state.mode === 'create' ? 'Add' : 'Edit'} Product</h5>
                                <button type="button" className="close" onClick={(e) => this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.mode=="edit"?"Form Component":"View Component"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { rfq } = state;
    return { rfq };
}

const connectedRfq = connect(mapStateToProps)(RFQ);
export { connectedRfq as RFQ };

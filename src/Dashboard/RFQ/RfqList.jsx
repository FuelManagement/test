import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_Helpers, Utils, Table_Config ,history} from '../../_helpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 


library.add(faPlus);

import ReactTable from 'react-table';
import 'react-table/react-table.css';
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
        this.props.dispatch(rfqActions.getAllProducts());
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        return this.props.dispatch(rfqActions.updateRfq(data));
    }
    toggleModal(event, data={}, mode="view") {
        this.setState({ rfqModal: !this.state.rfqModal, mode, selectedRfq: data });
        history.push('/rfq/add');
    }
    render() {
        const { rfq } = this.props;
        if (this.state.rfqModal) {
            $('#rfqModal').modal('show');
        } else {
            $('#rfqModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{ display: "inline-block" }}>RFQs</h2>
                <hr />
                <Link to="/rfq/add">
                    <button className="btn btn-outline btn-success">
                        <FontAwesomeIcon icon="plus"/> Add RFQ
                    </button>
                </Link>
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={rfq.rfqs}
                    columns={Table_Config.RFQ.rfqs.columns({toggleRfqModal: this.toggleModal.bind(this)})}
                    {...Table_Config.RFQ.rfqs.options}
                /> 
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

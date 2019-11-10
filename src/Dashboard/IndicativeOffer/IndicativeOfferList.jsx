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
import { ioActions } from '../../_actions'; 

class IndicativeOffer extends React.Component {
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
        this.props.dispatch(ioActions.getAllIO());
        
        this.props.dispatch(ioActions.getAllProducts());
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        return this.props.dispatch(ioActions.updateRfq(data));
    }
    toggleModal(event, data={}, mode="view") {
        this.setState({ rfqModal: !this.state.rfqModal, mode, selectedRfq: data });
        console.log("data");
        console.log(data);
        history.push('/indicative-offer/edit', {data});
    }
    render() {
        const { rfq } = this.props;
        if (this.state.rfqModal) {
            $('#rfqModal').modal('show');
        } else {
            $('#rfqModal').modal('hide');
        }
        return (
            <div className="col-md-9 offset-md-3 contentDiv">
                {/* <h2 style={{ display: "inline-block" }} className="table-main-heading">Indicative Offer</h2> */}
                <hr />
                <div>
                <h3 className="vendor-text" className="table-main-heading">Indicative Offer To Customer</h3> 
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={rfq.rfqs}
                    columns={Table_Config.IndicativeOfferCustomer.indicativeOffers.columns({toggleRfqModal: this.toggleModal.bind(this)})}
                    {...Table_Config.IndicativeOfferCustomer.indicativeOffers.options}
                /> 
                </div>
                <div>
                <h3 className="vendor-text">Indicative Offer From Supplier </h3> 
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={rfq.rfqs}
                    columns={Table_Config.IndicativeOfferSupplier.indicativeOffers.columns({toggleRfqModal: this.toggleModal.bind(this)})}
                    {...Table_Config.IndicativeOfferSupplier.indicativeOffers.options}
                /> 
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { rfq } = state;
    return { rfq };
}

const connectedRfq = connect(mapStateToProps)(IndicativeOffer);
export { connectedRfq as IndicativeOffer };

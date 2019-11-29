import React, { Fragment, Component } from 'react';
import './register.css';
import OrganizationInformation from './TabData/OrganizationInformation';
import ContactDetails from './TabData/ContactDetails';
import BankDetails from './TabData/BankDetails';

const allTab = {
    org: OrganizationInformation,
    contact: ContactDetails,
    bank: BankDetails,
    tax: 'TaxDetails',
    doc: 'Documents'
}

const NewRegisteration = (props) => {
    return (
        <Fragment>
            <div className='tab-container'>
                <div className='property-tab'
                    onClick={tab => { props.showTab('org') }}
                >
                    
                </div>
                <div className='property-tab'
                    onClick={tab => { props.showTab('contact') }}
                >
                    Contact Details
                </div>
                <div className='property-tab'
                    onClick={tab => { props.showTab('bank') }}
                >
                    Bank Details
                </div>
            </div>
        </Fragment>
    );
}


class ShowTabDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: allTab['org'],
        }
        this.showTab = this.showTab.bind(this);
    }

    showTab(tab) {
        this.setState({ selectedTab: tab })
    }
    render() {
        const Element = allTab[this.state.selectedTab];
        return (<div>
            <NewRegisteration
                showTab={this.showTab} />
            {Element && <Element/>}

        </div>)
    }
}
export default ShowTabDetails;
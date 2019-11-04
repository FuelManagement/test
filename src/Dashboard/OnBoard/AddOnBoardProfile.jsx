import React from "react";
import RegisterationStepper from '../../RegisterPage/RegisterationStepper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class AddOnBoardProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                    <h3>
                            <Link to="/profile"> <FontAwesomeIcon icon="angle-left" /></Link>
                            &nbsp;&nbsp;&nbsp; OnBoard Profile
                        </h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                        <RegisterationStepper />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
function mapStateToProps(state) {
    const { onboard } = state;

    return {
        onboard

    };
}

const connectedOnBoardProfile = connect(mapStateToProps)(AddOnBoardProfile);
export { connectedOnBoardProfile as AddOnBoardProfile }; 
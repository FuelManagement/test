import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CarouselComponent } from "../CarouselComponent";
import { userActions } from '../_actions';
import { LandingPageHeader } from '../_components/LandingPageHeader';
import RegisterationStepper from './RegisterationStepper';

const style = {
    loginSection: {
        paddingRight: "15px",
        paddingLeft: "15px"
    }
}

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email:'',
                firstName: '',
                lastName: '',
                address: '',
                password: '',
                rolesRequested:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if(user.password !== user.confirm_password) return;
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="mx-auto">
                <LandingPageHeader />
                <div className="row brd-tp1px">
                    <CarouselComponent></CarouselComponent>
                    {/* <div className="info-section">
                        <div className="w-100">
                            <h2>Fuel Tracking Management</h2>
                            <p>Blockchain Powered Application</p>
                        </div>
                    </div> */}
                    <div className="login-section" style={style.loginSection}>                        
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-content">
                                {/* <h2>
                                    <span className="sign-in"> 
                                        <Link to="/login">Sign In </Link>
                                    </span> 
                                    <span className="or"> Or </span> 
                                    <span className="sign-up">
                                        <Link to="/register">  Sign Up</Link>
                                    </span>
                                </h2> */}
                                <RegisterationStepper />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

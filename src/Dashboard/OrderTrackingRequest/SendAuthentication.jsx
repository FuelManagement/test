import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { validate } from '../../_helpers';
import { userProfileActions, alertActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import MuiPhoneInput from 'material-ui-phone-number';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class SendAuthentication extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(this.props.userProfile.mode, this.props.userProfile.userProfile);
        this.handleChange = this.handleChange.bind(this);
    }
    initialState(props) {
        let state = {};
        state = {
            controls: {
                sendAuthenticationEmail: {
                    value: props !== undefined && props.sendAuthenticationEmail !== undefined ? props.sendAuthenticationEmail : '',
                    valid: true,
                    validationRules: {
                        notEmpty: true,
                        isEmail: true
                    },
                    error: "",
                    touched: false,
                    visible: true,
                    disable: false
                },
                cellPhone: {
                    value: props !== undefined && props.sendAuthenticationEmail !== undefined ? props.sendAuthenticationEmail : '',
                    valid: true,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "",
                    touched: false,
                    visible: true,
                    disable: false
                },
            }
        }
        return state;
    }
    handleChange(event) {
        let key = event.target.name, value = event.target.value;
        console.log("key");
        console.log(key);
        let connectedValue = {};
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue,
                            key
                        ),
                        touched: true
                    }
                }
            };
        });
        this.props.dispatch(userProfileActions.changeUserProfile(key, value));
    }
    handleOnChange(value,key) {

        let connectedValue = {};
        this.setState(prevState => ({
            controls: {
              ...prevState.controls,
              [key]: {
                ...prevState.controls[key],
                value: value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue,
                  key
                ),
                touched: true
              }
            }
        }) ); 
        this.props.dispatch(userProfileActions.changeUserProfile(key, value)); 
      } 
    render() {
        return (
            <div>
                <Dialog onClose={this.props.handleClose} aria-labelledby="customized-dialog-title" open={this.props.isApprove} className="sendAuthenticaion-model">
                    <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                    </DialogTitle>
                    <DialogContent >
                        <p className="sendAuthenticaion-hdg">Send Authentication Request</p>
                        <div className="sendAuthenticaion-formDiv">
                            <p className="sendAuthenticaion-custhdg">Customer Name:
                                <span className="sendAuthenticaion-custName"> Michael</span>
                            </p>
                            <div className="row">
                                <div className="col-md-12 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.sendAuthenticationEmail.valid && this.state.controls.sendAuthenticationEmail.touched}
                                        id="sendAuthenticationEmail"
                                        label="Email"
                                        name="sendAuthenticationEmail"
                                        value={this.state.controls.sendAuthenticationEmail.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3 ">
                                    {/* <TextField
                                        error={!this.state.controls.cellPhone.valid && this.state.controls.cellPhone.touched}
                                        id="cellPhone"
                                        label="Cell Phone "
                                        name="cellPhone"
                                        value={this.state.controls.cellPhone.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    /> */}
                                    <MuiPhoneInput
                                        defaultCountry='us'
                                        margin="dense"
                                        variant="outlined"
                                        className="form-control"
                                        label="Cell Phone"
                                        value={this.state.controls.cellPhone.value}
                                        name="cellPhone" 
                                        onChange={val => this.handleOnChange(val, 'cellPhone')}
                                        />
                                </div>
                            </div>
                            <div className="row sendAuthenticat-submit-row">
                                <Button variant="contained" className="sendAuthenticat-submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        userProfile: state.userProfile,
        participants: state.onboard.participants
    };
}
const connectedSendAuthenticationForm = connect(mapStateToProps)(SendAuthentication);

export { connectedSendAuthenticationForm as SendAuthentication }; 
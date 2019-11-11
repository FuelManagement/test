import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
class OTPModel extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            "otp_1":'',
            "otp_2":'',
            "otp_3":'',
            "otp_4":'',
            "otp_5":'',
            "otp_6":'',
        }
        this.handleEnter = this.handleEnter.bind(this);
        this.getEnteredOTP=this.getEnteredOTP.bind(this);
        this.reSendOTP=this.reSendOTP.bind(this);
    }
    handleEnter(e) { 
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (index < 5) {
            form.elements[index + 1].focus();
        }
        this.setState({[event.target.id]:event.target.value});
        event.preventDefault();
    }
    getEnteredOTP(){
        this.props.getEnteredOTP(Object.values(this.state).toString().replace(/,/g, ''),this.props.OTRStatusId);
        let state = {
            "otp_1":'',
            "otp_2":'',
            "otp_3":'',
            "otp_4":'',
            "otp_5":'',
            "otp_6":'',
        }
        this.setState({...state});
    }
    reSendOTP(){
        this.props.getReSendOTP(this.props.RequestId);
    }
    //Allow only numbers 
    allowOnlynumbers(e) {
        var regex = new RegExp(/^[0-9\b]+$/);
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            e.preventDefault();
            return false;
        }
    }
    render() {
        const { showModel, OrderStatus } = { ...this.props };
        let btnDisabled = showModel;
        if (   !this.state.otp_1.length
            || !this.state.otp_2.length
            || !this.state.otp_3.length
            || !this.state.otp_4.length
            || !this.state.otp_5.length
            || !this.state.otp_6.length
        ){
            btnDisabled = true;
        } else {
            btnDisabled = false;
        }
        return (
            <div>
                <Dialog onClose={this.props.closeModel} className='order-tracking-otp-model' aria-labelledby="customized-dialog-title" open={showModel}>
                    <DialogTitle id="customized-dialog-title" onClose={this.props.closeModel} />
                    <div className='order-tracking-model-body'>
                        {OrderStatus === 'otp-disabled' && <Typography gutterBottom>
                            <p style={{color:"blue"}}>Your request has been submitted. <br/> Please wait until it is approved and an OTP is received.</p>
                        </Typography>
                        }
                        <div className={OrderStatus}>
                            <div>
                                <h5 className='otp-title'>Enter OTP</h5>
                                <form className="otp-form">
                                    <input type="text" id='otp_1' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                    <input type="text" id='otp_2' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                    <input type="text" id='otp_3' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                    <input type="text" id='otp_4' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                    <input type="text" id='otp_5' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                    <input type="text" id='otp_6' maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} onKeyPress={this.allowOnlynumbers} autoComplete="off" />
                                </form>
                            </div>
                            <div className='otp-text-notif'>
                                <p className='m0'>Did you receive the code ? if not,</p> 
                                <button className="reSend-otp" onClick={this.reSendOTP}>click here to resend</button>
                            </div>
                            <div className='order-tracking-opt-submit'>
                                <button className='btn btn-sucess' onClick={this.getEnteredOTP} disabled={btnDisabled}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
export { OTPModel }
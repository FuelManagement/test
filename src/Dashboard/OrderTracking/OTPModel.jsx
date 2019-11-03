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

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);



class OTPModel extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnter = this.handleEnter.bind(this);
    }
    handleEnter(e) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        console.log('index--',index);
        if (index < 5) {
            form.elements[index + 1].focus();
        }
        event.preventDefault();
    }
    render() {
        const { showModel, OrderStatus } = { ...this.props };
        return (
            <div>
                <Dialog onClose={this.props.closeModel} className='order-tracking-otp-model' aria-labelledby="customized-dialog-title" open={showModel}>
                    <DialogTitle id="customized-dialog-title" onClose={this.props.closeModel} />
                    <div className='order-tracking-model-body'>
                        {OrderStatus === 'otp-disabled' && <Typography gutterBottom>
                            <p className='otp-warning-msg'>Your request has been submitted. Please wait until it is approved and an OTP is received.</p>
                        </Typography>
                        }
                        <div className={OrderStatus}>
                            <div>
                                <h5 className='otp-title'>Enter OTP</h5>
                                <form className="otp-form">
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                    <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={this.handleEnter} />
                                </form>
                            </div>
                            <div className='otp-text-notif'>
                                <p className='m0'>Did you receive the code ? if not,</p>
                                <a href='#'>click here to resend</a>
                            </div>
                            <div className='order-tracking-opt-submit'>
                                <button className='btn btn-sucess' onClick={this.props.getEnteredOTP}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
export { OTPModel }
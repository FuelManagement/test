import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const btnStyle = {
    yes: {
        float: "right", 
        backgroundColor: "#00ce1b"
    },
    no: {
        backgroundColor: "#ce0030",
        float: "left"
    }
}

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

class ConfirmDialog extends React.Component {
    constructor(props){
        super(props);
    }
 
    render(){
        const props = this.props;
        return (
            <div>
                <Dialog
                    onClose={props.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={props.open}
                    className="sendAuthenticaion-model"
                    fullWidth={props.fullWidth || false}
                    maxWidth={props.maxWidth || false}>
                    <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                        <p className="sendAuthenticaion-hdg">{props.header || "Confirm"}</p>
                    </DialogTitle>
                    <DialogContent>
                        <div className="sendAuthenticaion-formDiv">
                            {props.message?props.message:(<p className="sendAuthenticaion-custhdg">{"Are you sure you want Reject ?"}</p>)}
                            <div className="sendAuthenticat-submit-row">
                                {props.decline == ""? "":
                                    <Button
                                        variant="contained"
                                        // className="sendAuthenticat-submit"
                                        onClick={props.handleClose}
                                        style={btnStyle.no}>
                                        {props.decline || "No"}
                                    </Button>
                                }{ props.accept == ""? "":
                                    <Button
                                        variant="contained"
                                        className=""
                                        onClick={props.confirmAction}
                                        style={btnStyle.yes}>
                                        {props.accept || "Yes"}
                                    </Button>
                                }
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div >
        )
    }
}

export { ConfirmDialog }
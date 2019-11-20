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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { orderTrackingActions } from '../../_actions';

import { Table_Config, dateutility, formatutility } from '../../_helpers';
let timer;
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
class OrderTrackingShowLedgerPop extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        timer = setInterval(() => { this.props.dispatch(orderTrackingActions.getShowLedgerBlockChainDetails()) }, 30000);
        setTimeout(function() {
            clearInterval(timer);
        }, 1000 * 60 * 30);
    }
    componentWillMount() {
        clearInterval(timer);
    }
    render() {
        const { showModel, showLedgerBlockChainDetails } = { ...this.props };
        return (
            <div className='col-md-8 offset-md-3 contentDiv order-tracking-main'> 
                    <p className='show-ledger-header'>Blockchain Transaction History</p>
                    <div className='order-tracking-model-body'>
                        <div>
                            <ReactTable
                                data={showLedgerBlockChainDetails && showLedgerBlockChainDetails.info_list || []}
                                columns={Table_Config.ProgressBar.ProgressBarRecords.columns()}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </div> 
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { showLedgerBlockChainDetails } = { ...state.orderTracking };
    return { showLedgerBlockChainDetails };
}

const connectedOrderTrackingShowLedgerPop = connect(mapStateToProps)(OrderTrackingShowLedgerPop);
export { connectedOrderTrackingShowLedgerPop as OrderTrackingShowLedgerPop }

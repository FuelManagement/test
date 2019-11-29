import React from 'react';
import { connect } from 'react-redux';
import { onboardActions } from '../_actions';
import Button from "@material-ui/core/Button";
class SubmitBtn extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        if(this.props.onboard.mode==='create'){
            this.props.dispatch(onboardActions.createParticipant(this.props.onboard.participant,this.props.onboard.documentslist));
          }
          else if (this.props.onboard.mode==='update'){
            this.props.dispatch(onboardActions.updateParticipant(this.props.onboard.participant,this.props.onboard.documentslist));
          }
          else{

          }
    }
    render() {
        return <div className='register-submitbtn'>
            <Button
                variant="contained"
                onClick={ this.handleSubmit}>Save
        </Button></div>
    }
}
function mapStateToProps(state) {
    const { onboard } = state;

    return {
        onboard

    };
}

const connectedSubmitBtn = connect(mapStateToProps)(SubmitBtn);
export { connectedSubmitBtn as SubmitBtn };

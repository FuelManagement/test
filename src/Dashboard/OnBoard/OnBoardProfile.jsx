import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { onboardActions } from '../../_actions';
import RegisterationStepper from '../../RegisterPage/RegisterationStepper';

class OnBoard_Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            createParticipantModal: false,
            domain:'',
            mode:this.props.onboard.mode!==undefined?this.props.onboard.mode:'create'
        }
       
        this.toggleModal=this.toggleModal.bind(this);
    }
    componentWillReceiveProps(nextprops)
    {
    if(JSON.stringify(this.props.onboard.mode)!==JSON.stringify(nextprops.onboard.mode))
    {
  this.setState({mode:nextprops.onboard.mode})
    }}
    componentDidMount() {
       
        this.props.dispatch(onboardActions.getAllParticipant());  
    }

    shouldComponentUpdate(){
        return true;
    }
   
    toggleModal(event){
        if(this.state.createParticipantModal){
            $('#createParticipantModal input[type="text"]').val("");
        }
        this.setState({createParticipantModal:!this.state.createParticipantModal})
    }
    toggleParticipantModal(e,data)
    {
        if(this.state.createParticipantModal){
            $('#createParticipantModal input[type="text"]').val("");
        }
        this.props.dispatch(onboardActions.changeModeParticipant('update'));
        this.props.dispatch(onboardActions.getParticipant(data));
        this.setState({createParticipantModal:!this.state.createParticipantModal});
    }
    render() {
        //const { loading,product,products,mode} = this.props.product;
        if(this.state.createParticipantModal){
            $('#createParticipantModal').modal('show');
        } else{
            $('#createParticipantModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{display:"inline-block"}}>
                    OnBoarding - Profile Setup
                </h2>
                
                <hr/>
                <div>
                <button name="btnAddProduct" className="btn btn-primary btn-sm col-md-offset-4 center link-bg button-style"
                        onClick={e => {this.toggleModal(e);this.props.dispatch(onboardActions.changeModeParticipant('create'));}} >
                        Add OnBoarding Profile
                </button>
                    {/* <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search:e.target.value})} 
                        placeholder="Search By Name" /> */}
                </div>
                <div className="clearDiv"></div>
                <br/>
                <ReactTable
                    data={this.props.onboard.participants}
                    columns={Table_Config.Participant.participants.columns({toggleParticipantModal:this.toggleParticipantModal.bind(this)})}
                    {...Table_Config.Participant.participants.options}
                />

                <hr/>
                <br/>

                <div className="modal onboard-profile" id="createParticipantModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">{this.state.mode==='create'?'Add':'Edit'} Participant</h5>
                                <button type="button" className="close" onClick={(e)=>this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* <ProductForm mode={this.state.mode} closeModal={this.toggleModal}/> */}
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
    const { onboard } = state;
   
    return {
        onboard
      
    };
}

const connectedOnBoardProfile = connect(mapStateToProps)(OnBoard_Profile);
export { connectedOnBoardProfile as OnBoardProfile };

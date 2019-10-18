import React from 'react';

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.submitModal = this.submitModal.bind(this);
    }
 
    render(){
        const { open } = this.props;
        return (
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary link-bg" onClick={this.submitModal} >Save changes</button>
                            <button type="button" class="btn btn-secondary link-bg" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { Modal }
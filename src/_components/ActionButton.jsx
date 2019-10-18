import React from 'react';

class ActionButton extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.props.handleClick.bind(this);
    }
 
    render(){
        const { loading, btnClass='info', size='sm', action='Submit' } = this.props;
        return (
            <button 
                className={`btn btn-${btnClass} btn-${size}`}
                disabled={loading} onClick={this.handleClick}> 
                    {loading?'Loading . . .':action}
            </button>
        )
    }
}

export { ActionButton }

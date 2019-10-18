import React from 'react';
import './overlay.css';
class Overlay extends React.Component {
    constructor(props){
        super(props);
    }
 
    render(){
        const { loading } = this.props;
        return (
            <div className={loading?"loading":"hidden"}>Loading&#8230;</div>
        )
    }
}

export { Overlay }
import React from 'react'; 
import 'bootstrap'; 
import RegisterationStepper from '../../RegisterPage/RegisterationStepper'
class OnBoard_Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
        } 
    }
    render() { 
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                                <RegisterationStepper />       
            </div>
        );
    }
}
 
 
export { OnBoard_Profile as OnBoardProfile };

import React from 'react';
import Button from "@material-ui/core/Button";
class SubmitBtn extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className='register-submitbtn'>
            <Button
                variant="contained"
                onClick={(e) => handleSubmit(e)}>Submit
        </Button></div>
    }
}
export { SubmitBtn };
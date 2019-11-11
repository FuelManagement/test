import React from 'react';


class Volumetric extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="col-md-8 offset-md-3 contentDiv order-tracking-main">
                 <h2 style={{ display: "inline-block" }} className="table-main-heading">Volumetric</h2>
                <hr />
                <div>
                <iframe width='100%' height="500" src="https://app.powerbi.com/view?r=eyJrIjoiMjZjYWNlYjItYmZlZC00YTQ4LWExY2ItZGU2YjE2ZjgzYTY0IiwidCI6ImUxM2NmZDhhLWQwNTAtNDg2ZS04MGE4LWQxZjU0YzFlZWVmNyIsImMiOjF9" frameBorder="0" allowFullScreen="true"></iframe>
                </div>
            </div>
        )
    }
}
export {Volumetric};
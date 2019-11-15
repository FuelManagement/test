import React from 'react';


class Volumetric extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        let user = localStorage.getItem('user');
        user = typeof user === "string"? JSON.parse(user):{};
        if(user.participantType === 'End Buyer')
        {
            return(
                <div className="col-md-8 offset-md-3 contentDiv order-tracking-main">
                    <h2 style={{ display: "inline-block" }} className="table-main-heading">Volumetric</h2>
                    <hr />
                    <div>
                    <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNzU2NWZiYzUtZmNiNy00YTdmLWFmMzktZjUzMWFiZjFmZGVhIiwidCI6ImUxM2NmZDhhLWQwNTAtNDg2ZS04MGE4LWQxZjU0YzFlZWVmNyIsImMiOjF9" frameborder="0" allowFullScreen="true"></iframe>
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div className="col-md-8 offset-md-3 contentDiv order-tracking-main">
                    <h2 style={{ display: "inline-block" }} className="table-main-heading">Volumetric</h2>
                    <hr />
                    <div>
                    <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiYjM1MzQ2ZDYtYTBhNS00YmM3LWE2NzgtMjcyNmU4NGUxYjYzIiwidCI6ImUxM2NmZDhhLWQwNTAtNDg2ZS04MGE4LWQxZjU0YzFlZWVmNyIsImMiOjF9" frameborder="0" allowFullScreen="true"></iframe>
                    </div>
                </div>
            )
        }
    }
}
export {Volumetric};
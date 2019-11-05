import React from 'react';
import axios from 'axios';
import {AppConfiguration} from "read-appsettings-json";
import './orderTracking.css';

class OrderTracking extends React.Component{

    constructor(props){
        super(props)
        this.state={
            orders:[],
            // orders:[
            //     {
            //     orderName: "CFEnergia power", 
            //     RequestedBy:"James Robert",
            //     Owner:"yes",
            //     Status:"AutoApproved",
            //     RequestTimings:"08/20/2019 10:00 AM",
            //     'Approve/Reject':"Approve"
            // },
            // {
            //     orderName: "BP Gas station", 
            //     RequestedBy:"JackJacob",
            //     Owner:"No",
            //     Status:"Rejected",
            //     RequestTimings:"08/20/2019 10:10AM",
            //     'Approve/Reject':"Approve"
            // },
            // {
            //     orderName: "Pemex Gas station", 
            //     RequestedBy:"Thomas Noah",
            //     Owner:"No",
            //     Status:"Approved",
            //     RequestTimings:"08/20/2019 11:00AM",
            //     'Approve/Reject':"Approve"
            // },
            // {
            //     orderName: "CFEnergia power", 
            //     RequestedBy:"Michael William",
            //     Owner:"No",
            //     Status:"NewRequest",
            //     RequestTimings:"08/20/2019 12:00 PM",
            //     'Approve/Reject':"Approve"
            // }
                
            // ]
        }

        

    }  

    componentDidMount() {

        // Mock API

        if(AppConfiguration.Setting().orderTrackingLocalData){
            
        axios.get(`http://www.mocky.io/v2/5dc0ed7f3300002f311a4d71`)
          .then(res => {
            const orders = res.data;
            this.setState({ orders });
          })
        }
        //Real API
        else {
            axios.get(`http://www.mocky.io/v2/5dc0d7d233000099001a4d3d`)
            .then(res => {
              const orders = res.data;
              this.setState({ orders });
            })

        }
      }


    renderOrderTrackTable(){
        if(this.state.orders && this.state.orders.length > 0){
        return this.state.orders.map((order,index) => {
            let Approve = false
            const { CustomerName,RequestedBy,Owner,Status,ApproveORReject,RequestTimings}=order
            if (Owner==='yes') { 
                Approve =true
           } 
           else {
                Approve =false
           }

            return(
            <tr key={RequestTimings}>
                <td>{CustomerName}</td>
                <td>{RequestedBy}</td>
                <td>{Owner}</td>
                <td> {Status}</td>
                <td>{RequestTimings}</td>
               { Approve? 

                    ( <td>{ApproveORReject}</td> ) :
                    
                    (
                    <td>
                    <select >
                    <option value="Approve">Approve</option>  
                    <option value="Reject">Reject</option>   
                    </select>
                    </td>

                    )
                } 
            </tr>
        )
        })
    }
    }
    renderTableHeader() {
        if(this.state.orders && this.state.orders.length > 0){
        let header = Object.keys(this.state.orders[0])
        return header.map((key, index) => {
           return <th key={index}>{key}</th>
        })
    }
     }
   
    render(){
        return (
            <div>
                  <h1 id="title">OrderTracking</h1>
                  <table id ="orders">
                   <tbody>
                       <tr>{this.renderTableHeader()} 
                       </tr>
                       
                       {this.renderOrderTrackTable()}
                   </tbody>
                  </table>  
            </div>
        )
    }
} 

export default OrderTracking; 


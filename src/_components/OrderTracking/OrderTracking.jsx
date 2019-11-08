import React from 'react';
import axios from 'axios';
import {AppConfiguration} from "read-appsettings-json";
import './orderTracking.css';

class OrderTracking extends React.Component{

    constructor(props){
        super(props)
        this.state={
            orders:[],
        }
    }  

    componentDidMount() {

        // Mock API

        if(AppConfiguration.Setting().orderTrackingLocalData){
            
        axios.get(`http://www.mocky.io/v2/5dc0d7d233000099001a4d3d`)
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


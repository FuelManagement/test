import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
       
                  }
        
    }
    UNSAFE_componentWillReceiveProps(nextprops)
    {
    }
    componentDidMount() {
      }

    shouldComponentUpdate(){
        return true;
    }
    
    
    render() {
        
        return (
            <div className="MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded" style={{"position": "relative"}}>
                <div className="MuiToolbar-root MuiToolbar-regular MTableToolbar-root-114 MuiToolbar-gutters">
                    <div className="MTableToolbar-spacer-116">
                        </div>
                        <div className="MTableToolbar-actions-117">
                            <div>
                                <div>
                                    <span><button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabIndex="0" type="button" title="Add">
                                        <span className="MuiIconButton-label"><span className="material-icons MuiIcon-root" aria-hidden="true">add_box</span></span><span className="MuiTouchRipple-root"></span></button></span></div></div></div></div>
                
                <ReactTable
                    data={[]}
                    columns={[
                    {
                        Header: 'Product Name',
                        accessor: 'productName',
                        Cell: row => <span title={row.original.productName}>{row.original.productName}</span>
                    },{
                        Header: 'Category',
                        accessor: 'productCategory',
                        Cell: row => <span title={row.original.productCategory}>{row.original.productCategory}</span>
                    }, {
                        Header: 'Sub Category',
                        accessor: 'subCategory',
                        Cell: row => <span title={row.original.subCategory}>{row.original.subCategory}</span>
                    },
                     {
                        Header: 'Measuring Unit',
                        accessor: 'quantityUnit',
                        Cell: row => <span title={row.original.measuringUnit}>{row.original.measuringUnit}</span>
                    }, {
                        Header: 'Quantity',
                        accessor: 'quantity',
                        Cell: row => <span title={row.original.quantity}>{row.original.quantity}</span>
                    },{
                        Header: 'Price',
                        accessor: 'price',
                        style: { textAlign: 'right' },
                        Cell: row => <span title={(row.original.price)}>{(row.original.price)}</span>
                    }, {
                        Header: 'Price Adjustment',
                        accessor: 'priceAdjustment',
                        },
                    {
                        Header: 'Action',
                        accessor: 'productName',
                       
                    }]}
                    {...Table_Config.Product.products.options}
                />

                 </div>
        );
    }
}


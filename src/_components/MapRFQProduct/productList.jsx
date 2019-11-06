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
import { TextField, Select, Checkbox, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                        products:this.props.products!==undefined?this.props.products:[],
                        showAddProduct:true,
                        selectedProduct:{}
                  };
       this.handleAddProduct=this.handleAddProduct.bind(this);
       this.handleDeleteProduct=this.handleDeleteProduct.bind(this);
       this.handleEditProduct=this.handleEditProduct.bind(this);  
       this.handleChange=this.handleChange.bind(this);  
       this.handleReset=this.handleReset.bind(this);  
       this.handleSave=this.handleSave.bind(this);        
        
    }
    UNSAFE_componentWillReceiveProps(nextprops)
    {
    }
    componentDidMount() {
      }

    shouldComponentUpdate(){
        return true;
    }
    handleAddProduct(){
    let product={
    currency: "",
    measuringUnit: "",
    price: "",
    productCategory: "",
    productID: "",
    productName: "",
    productStatus: "",
    role: "",
    subCategory: "",
    userID: "",
    quantity:"",
    priceAdjustment:"",
    rowAction:{add:true,edit:false,delete:false}
    };
    this.setState(prevState => ({
        products: [...prevState.products, product]
      }),()=>{ this.setState({showAddProduct:false})});
   
    }
    handleEditProduct(){
        let product=this.state.products.find(f=>f.rowAction.add===true || f.rowAction.edit===true);
        this.setState({selectedProduct:product});
    }
    handleDeleteProduct(){
        
    }
    handleChange(event){
        
        let product=this.state.products.find(f=>f.rowAction.add===true || f.rowAction.edit===true);
        
        var array = [...this.state.products]; // make a separate copy of the array
        var index = array.indexOf(product)
        if (index !== -1) {
          array.splice(index, 1);
        }
        let key=event.target.name,value=event.target.value;
        if(key==='productName'){
        let productDetail=(this.props.productDetailList ||[]).find(f=>f.productName=event.target.value);
        product.productCategory=productDetail.productCategory;
        product.productName=productDetail.productName;
        product.subCategory=productDetail.subCategory;
        product.measuringUnit=productDetail.measuringUnit;
        }else{
            product[key]=value;
        }
        array=[...array,product];
        this.setState({products:array})
    }
    handleSave(){
        
        let product=this.state.products.find(f=>f.rowAction.add===true || f.rowAction.edit===true);
        var array = [...this.state.products]; // make a separate copy of the array
        var index = array.indexOf(product)
        if (index !== -1) {
          array.splice(index, 1);
        }
        product.rowAction.add=false;
        product.rowAction.edit=false;
        product.rowAction.delete=false;
        array=[...array,product];
        this.setState({products:array,showAddProduct:true,selectedProduct:{}})
    }
    handleReset(){
        
        let product=this.state.products.find(f=>f.rowAction.add===true || f.rowAction.edit===true);
        var array = [...this.state.products]; // make a separate copy of the array
        var index = array.indexOf(product)
        if (index !== -1) {
          array.splice(index, 1);
        }
        if(product.rowAction.edit){
        array=[...array,this.state.selectedProduct];
        }
        this.setState({products:array,showAddProduct:true,selectedProduct:{}})
    }
    attachActions(product){
        if(product.rowAction===undefined || product.rowAction===null){
            product.rowAction={
               add:false, edit:false,delete:false
            }
        }
        return product;
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
                                    <span><button onClick={this.handleAddProduct} disabled={!this.state.showAddProduct} className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabIndex="0" type="button" title="Add">
                                        <span className="MuiIconButton-label"><span className="material-icons MuiIcon-root" aria-hidden="true">add_box</span></span><span className="MuiTouchRipple-root"></span></button></span></div></div></div></div>
                
                <ReactTable
                    data={this.state.products}
                    columns={[
                    {
                        Header: 'Product Name',
                        accessor: 'productName',
                        Cell: row =>(row.original.rowAction.add || row.original.rowAction.edit? <FormControl style={{ width: "100%" }}>
                        <TextField
                            select
                           id='productName'
                            variant="outlined"
                            name='productName'
                            label='Product Name'
                            value={row.original.productName}
                            className="form-control"
                            onChange={(e)=>this.handleChange(e)}
                            margin="dense"
                           
                        >
                            {(this.props.productDetailList || []).map(option => (
                                    <MenuItem key={option.productName} value={option.productName}>
                                        {option.productName}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </FormControl>: <span title={row.original.productName}>{row.original.productName}</span>)
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
                        Cell: row =>(row.original.rowAction.add || row.original.rowAction.edit? <FormControl style={{ width: "100%" }}>
                        <TextField
                           
                           id='quantity'
                            variant="outlined"
                            name='quantity'
                            label='Quantity'
                            value={row.original.quantity}
                            className="form-control"
                            onChange={(e)=>this.handleChange(e)}
                            margin="dense"
                           
                        >
                           
                        </TextField>
                    </FormControl>: <span style={{ textAlign: "right" }} title={row.original.quantity}>{row.original.quantity}</span>)
                    },{
                        Header: 'Price',
                        accessor: 'price',
                        
                        Cell: row => (row.original.rowAction.add || row.original.rowAction.edit? <FormControl style={{ width: "100%" }}>
                        <TextField
                           
                           id='price'
                            variant="outlined"
                            name='price'
                            label='Price'
                            value={row.original.price}
                            className="form-control"
                            onChange={(e)=>this.handleChange(e)}
                            margin="dense"
                           
                        >
                           
                        </TextField>
                    </FormControl>:<span style={{ textAlign: "right" }} title={(row.original.price)}>{(row.original.price)}</span>)
                    }, {
                        Header: 'Price Adjustment',
                        accessor: 'priceAdjustment',
                        },
                    {
                        Header: 'Action',
                        accessor: 'productName',
                        Cell: row => (row.original.rowAction.add || row.original.rowAction.edit || row.original.rowAction.delete?
                            <span><span onClick={()=>this.handleSave()}><FontAwesomeIcon icon="check" /></span>
                            <span onClick={()=>this.handleReset()}><FontAwesomeIcon icon="times" /></span></span> 
                            :<span> <span><FontAwesomeIcon icon="edit" /></span>
                            <span><FontAwesomeIcon icon="trash" /></span></span>
                            )
                    }]}
                    {...Table_Config.Product.products.options}
                />

                 </div>
        );
    }
}


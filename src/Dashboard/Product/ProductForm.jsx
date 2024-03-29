import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, Checkbox, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors'; 
import { withStyles } from '@material-ui/core/styles';
import {productActions, alertActions} from '../../_actions';
import { validate } from '../../_helpers';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import {Common_JsonData} from '../../_helpers';
  
// const Common_JsonData={
//     productCategory:[{
//         value: "",
//         label: "None"
//     },
//     {
//         value: "prod1",
//         label: "prod1"
//     },
//     {
//         value: "prod2",
//         label: "prod2"
//     },],
//     subCategory:[{
//         value: "",
//         label: "None",
//         productCategory:""
//     },{
//         value: "Sub1Prod1",
//         label: "Sub1Prod1",
//         productCategory:"prod1"
//     },{
//         value: "Sub2Prod1",
//         label: "Sub2Prod1",
//         productCategory:"prod1"
//     },{
//         value: "Sub1Prod2",
//         label: "Sub1Prod2",
//         productCategory:"prod2"
//     },{
//         value: "Sub2Prod2",
//         label: "Sub2Prod2",
//         productCategory:"prod2"
//     },{
//         value: "Sub3Prod2",
//         label: "Sub3Prod2",
//         productCategory:"prod2"
//     },],
//     measuringUnit:[{
//         value: "",
//         label: "None"
//     },{
//         value: "Litre",
//         label: "Litre"
//     },{
//         value: "Barrel",
//         label: "Barrel"
//     },{
//         value: "Gallon (US)",
//         label: "Gallon (US)"
//     },],
//     currency:[{
//         value: "",
//         label: "None"
//     },{
//         value: "USD",
//         label: "United State Dollor (USD)"
//     },{
//         value: "CAD",
//         label: "Canadian Dollar (CAD)"
//     },{
//         value: "MXN",
//         label: "Maxecian Peso (MXN)"
//     },],
// }

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state=this.initialState(this.props.mode, this.props.product.product);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextprops)
  {
  if(JSON.stringify(this.props.product.product)!==JSON.stringify(nextprops.product.product))
  {
    ["productCategory","subCategory","productName","price","measuringUnit","currency","productStatus"].forEach(name => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            [name]: {
              ...prevState.controls[name],
              value: name ==='productStatus'?!(nextprops.product.product[name]=='true'?true:false):(nextprops.product.product[name]!==undefined?nextprops.product.product[name]:''), 
              disable: nextprops.mode==='view'?true:false
            }
          }
        }
      });
    });
  
  }}
  shouldComponentUpdate(){
    return true;
}
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        productCategory: {
          value: props!==undefined && props.productCategory!==undefined?props.productCategory:'',
          valid:mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select Product Category",
          placeholder: "Product Category",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        subCategory: {
          value: props!==undefined && props.subCategory !==undefined?props.subCategory:'',
          valid:mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select sub category" ,
          placeholder: "Sub Category ",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        productName: {
          value: props!==undefined && props.productName!==undefined?props.productName:'',
          valid:mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
            isName:true,
            maxLength:true,
          },
          error: "Please enter product name",
          placeholder: "Product Name",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        price: {
          value: props!==undefined && props.price!==undefined?props.price:'',
          valid: mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
            isNumber:true
          },
          error: "Please enter price",
          placeholder: "Price",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        measuringUnit: {
          value: props!==undefined && props.measuringUnit!==undefined?props.measuringUnit:'',
          valid: mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select measuring unit",
          placeholder: "Measuring Unit",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        currency: {
          value: props!==undefined && props.currency!==undefined?props.currency:'',
          valid: mode !=='create'?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter currency",
          placeholder: "Currency",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
        productStatus: {
          value: props!==undefined && props.productStatus!==undefined?props.productStatus:true,
          valid: true,
          validationRules: {
          },
          error: "Please select product status",
          placeholder: "Product Status",
          touched: false,
          visible: true,
          disable: mode==='view'?true:false
        },
      },
      errors: {}
    };
    return state;
  }
  handleChange(event) {
    let key = event.target.name, value = event.target.name==='productStatus'?!(event.target.value=='true'?true:false):event.target.value;
    let connectedValue = {productName:{maxLength:50}};
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
             valid: validate(
               value,
              prevState.controls[key].validationRules,
              connectedValue,key
             ),
            touched: true
          }
        }
      };
    });
    this.props.dispatch(productActions.changeProduct(key,value));
  }
 handleSubmit()
 {
     let isFormVaild=true;
    if (this.state.controls !== undefined) {
        ["productCategory","subCategory","productName","price","measuringUnit","currency"].forEach(name => {
          let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
          if (!value && this.props.product.mode==='create') {
           this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
           isFormVaild=false;
          }
          else if(!value && touched && this.props.product.mode!=='create'){
            this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
           isFormVaild=false;
          }
          
        });
        if(isFormVaild){
     if(this.props.product.mode==='create')
     {
         this.props.dispatch(productActions.createProduct(this.props.product.product));
     }else{
        this.props.dispatch(productActions.updateProduct(this.props.product.product));
     }
     this.props.closeModal();
    }
    }
 }
 
  render() { 
    return (
      <div className="mx-auto product-form">
        <div className="form-row">
          <div className="col-md-6 mb-3">
          <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                error={!this.state.controls.productCategory.valid && this.state.controls.productCategory.touched}
                                id='productCategory'
                                variant="outlined"
                                name='productCategory'
                                label={this.state.controls.productCategory.placeholder}
                                value={this.state.controls.productCategory.value}
                                className="form-control"
                                onChange={this.handleChange}
                                margin="dense"
                               disabled={this.state.controls.productCategory.disable}
                            >
                                {Common_JsonData.productCategory && Common_JsonData.productCategory.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
          </div>
          <div className="col-md-6 mb-3 ">
          <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                error={!this.state.controls.subCategory.valid && this.state.controls.subCategory.touched}
                                id='subCategory'
                                variant="outlined"
                                name='subCategory'
                                label={this.state.controls.subCategory.placeholder}
                                value={this.state.controls.subCategory.value}
                                className="form-control"
                                onChange={this.handleChange}
                                margin="dense"
                                disabled={this.state.controls.subCategory.disable}
                            >
                                {Common_JsonData.subCategory && Common_JsonData.subCategory.filter(f=>f.productCategory===this.state.controls.productCategory.value).map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
          </div>
         
          </div>
          <div className="form-row">
          <div className="col-md-6 mb-3">
            <TextField
            error={!this.state.controls.productName.valid && this.state.controls.productName.touched}
              id="productName"
              margin="normal"
              name="productName"
              label={this.state.controls.productName.placeholder}
              value={this.state.controls.productName.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              disabled={this.state.controls.productName.disable}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
            error={!this.state.controls.price.valid && this.state.controls.price.touched}
              id="price"
              margin="normal"
              name="price"
              label={this.state.controls.price.placeholder}
              value={this.state.controls.price.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              disabled={this.state.controls.price.disable}
            />
          </div>
          </div>
        <div className="form-row">
          
          <div className="col-md-6 mb-3">
          <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                error={!this.state.controls.measuringUnit.valid && this.state.controls.measuringUnit.touched}
                                id='measuringUnit'
                                variant="outlined"
                                name='measuringUnit'
                                label={this.state.controls.measuringUnit.placeholder}
                                value={this.state.controls.measuringUnit.value}
                                className="form-control"
                                onChange={this.handleChange}
                                margin="dense"
                                disabled={this.state.controls.measuringUnit.disable}
                            >
                                {Common_JsonData.measuringUnit && Common_JsonData.measuringUnit.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
          </div>
          <div className="col-md-6 mb-3">
          <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                error={!this.state.controls.currency.valid && this.state.controls.currency.touched}
                                id='currency'
                                variant="outlined"
                                name='currency'
                                label={this.state.controls.currency.placeholder}
                                value={this.state.controls.currency.value}
                                className="form-control"
                                onChange={this.handleChange}
                                margin="dense"
                                disabled={this.state.controls.currency.disable}
                            >
                                {Common_JsonData.Currency && Common_JsonData.Currency.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
          <FormControlLabel
                            control={<Checkbox  icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon"/>}
                             onChange={this.handleChange} name="productStatus" 
                             checked={this.state.controls.productStatus.value}
                             value={this.state.controls.productStatus.value}
                             disabled={this.state.controls.productStatus.disable}
                              />}
                            label={this.state.controls.productStatus.placeholder}
                            className="form-checkbox"  
                            name="productStatus"
                            labelPlacement="start"
                        />
          </div>
        </div>
        <div className="clearDiv"></div>
                                    
                                    <div className="offset-7">
                                        <button className="btn btn-default" 
                                            type="reset" onClick={()=>{this.props.closeModal();this.props.dispatch(productActions.resetProduct());}}>
                                            Cancel
                                        </button>
                                      {this.props.mode!=='view'? <button className="btn btn-primary link-bg button-style" 
                                            type="button" onClick={this.handleSubmit} disabled={this.props.product.loading} >
                                            {this.props.product.mode==='create'?'Create':'Update'}
                                        </button>:null}
                                    </div>
         </div>
    );
  }
}

function mapStateToProps(state) {
  const { product } = state;
   
    return {
        product
      
    };
}

const connectedProductForm = connect(mapStateToProps)(ProductForm);
export { connectedProductForm as ProductForm };

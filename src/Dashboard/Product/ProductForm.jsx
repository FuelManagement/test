import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faPlus);
import { TextField, Select, Checkbox, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { productActions, alertActions } from '../../_actions';
import { validate } from '../../_helpers';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { Common_JsonData } from '../../_helpers';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(this.props.mode, this.props.product.product);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (JSON.stringify(this.props.product.product) !== JSON.stringify(nextprops.product.product)) {
      ["productCategory", "subCategory", "productName", "price", "measuringUnit", "currency", "productStatus"].forEach(name => {
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              [name]: {
                ...prevState.controls[name],
                value: name === 'productStatus12' ? !(nextprops.product.product[name] == 'true' ? true : false) : (nextprops.product.product[name] !== undefined ? nextprops.product.product[name] : ''),
                disable: nextprops.mode === 'view' ? true : false
              }
            }
          }
        });
      });

    }
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount(){
    if(this.props.product.mode === "update"){
      this.setState({
        productStatusdsb:false      
      }) 
    }
    else{
      this.setState({
        productStatusdsb:true      
      }) 
    }
    if(this.props.product.mode === "view"){
      this.setState({
        formdisable:true      
      })
    }
    else{
      this.setState({
        formdisable:false      
      })
    }
    if(this.props.product.mode === "create"){
    this.props.dispatch(productActions.changeProduct("productStatus", 'Active'));
    }
  }
  initialState(mode, props) {
    let state = {};
    state = { 
      formdisable:false,
      productStatusdsb:false,
      controls: {
        productCategory: {
          value: props !== undefined && props.productCategory !== undefined ? props.productCategory : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select Product Category",
          placeholder: "Product Category",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        subCategory: {
          value: props !== undefined && props.subCategory !== undefined ? props.subCategory : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select sub category",
          placeholder: "Sub Category ",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        productName: {
          value: props !== undefined && props.productName !== undefined ? props.productName : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
            isName: true,
            maxLength: true,
          },
          error: "Please enter product name",
          placeholder: "Product Name",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        price: {
          value: props !== undefined && props.price !== undefined ? props.price : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
            isNumber: true
          },
          error: "Please enter price",
          placeholder: "Price",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        measuringUnit: {
          value: props !== undefined && props.measuringUnit !== undefined ? props.measuringUnit : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select measuring unit",
          placeholder: "Measuring Unit",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        productStatus:{
          value: props !== undefined && props.productStatus !== undefined ? props.productStatus : 'Active',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please select product status",
          placeholder: "Status",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        currency: {
          value: props !== undefined && props.currency !== undefined ? props.currency : '',
          valid: mode !== 'create' ? true : false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter currency",
          placeholder: "Currency",
          touched: false,
          visible: true,
          disable: mode === 'view' ? true : false
        },
        // productStatus: {
        //   value: props !== undefined && props.productStatus !== undefined ? props.productStatus : true,
        //   valid: true,
        //   validationRules: {
        //   },
        //   error: "Please select product status",
        //   placeholder: "Product Status",
        //   touched: false,
        //   visible: true,
        //   disable: mode === 'view' ? true : false
        // },
      },
      errors: {}
    };
    return state;
  }
  handleChange(event) {
    console.log("product")
    console.log(this.props.product.products);
    let key = event.target.name, value = event.target.value;
    let connectedValue = { productName: { maxLength: 50 } };
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            // valid: validate(
            //   value,
            //   prevState.controls[key].validationRules,
            //   connectedValue, key
            // ),
            valid:true,
            touched: true
          }
        }
      };
    });
     this.props.dispatch(productActions.changeProduct(key, value));
  }
  handleSubmit() {
    let isFormVaild = true;
    if (this.state.controls !== undefined) {
      ["productCategory", "subCategory", "productName", "measuringUnit",'productStatus'].forEach(name => {
        let value = this.state.controls[name].value;//, touched = this.state.controls[name].touched;
        if (value.trim() ==="") {
          this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
          isFormVaild = false;
        }
        // else if (!value && touched && this.props.product.mode !== 'create') {
        //   this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
        //   isFormVaild = false;
        // }

      });
      if (isFormVaild) {
        if (this.props.product.mode === 'create') {
          this.props.dispatch(productActions.createProduct(this.props.product.product));
        } else {
          this.props.dispatch(productActions.updateProduct(this.props.product.product));
        }
 //     this.props.closeModal();
      }
    }
  }
  render() {
    return (
      <div className="mx-auto product-form">
        <div className="row brd-tp1px">
          <div className='col-lg-9 add-rfq-main'>
            <h3 className="product-form-hdg">
              <Link to="/product"> <FontAwesomeIcon icon="angle-left" /></Link>
              &nbsp;&nbsp;&nbsp;{this.props.product.mode} Product
                        </h3>
            <hr />
            <div className="col-12 col-md-12 form-wrapper product-form-div">
              <div className="form-row">
                <div className="col-md-4 mb-3">
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
                    disabled= {this.state.formdisable}
                    // {this.state.controls.productName.disable}
                  />
                </div>
                <div className="col-md-4 mb-3">
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
                    disabled= {this.state.formdisable} 
                    >
                      {Common_JsonData.productCategory && Common_JsonData.productCategory.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                <div className="col-md-4 mb-3 ">
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
                      disabled={this.state.formdisable}
                    >
                      {Common_JsonData.subCategory && Common_JsonData.subCategory.filter(f => f.productCategory === this.state.controls.productCategory.value).map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>

              </div>
              {/* <div className="form-row">

                <div className="col-md-4 mb-3">
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
              </div> */}
              
              <div className="form-row">
              <div className="col-md-4 mb-3">
                  {/* <FormControlLabel
                    control={<Checkbox icon={<CircleUnchecked className="checkboxIcon" />} checkedIcon={<CircleCheckedFilled className="checkboxIcon" />}
                      onChange={this.handleChange} name="productStatus"
                      checked={this.state.controls.productStatus.value}
                      value={this.state.controls.productStatus.value}
                      disabled={this.state.controls.productStatus.disable}
                    />}
                    label={this.state.controls.productStatus.placeholder}
                    className="form-checkbox"
                    name="productStatus"
                    labelPlacement="start"
                  /> */}
                   <FormControl style={{ width: "100%" }}>
                    <TextField
                      select
                      error={!this.state.controls.productStatus.valid && this.state.controls.productStatus.touched}
                      id='productStatus'
                      variant="outlined"
                      name='productStatus'
                      label={this.state.controls.productStatus.placeholder}
                      value={this.state.controls.productStatus.value}
                      className="form-control"
                      onChange={this.handleChange}
                      margin="dense"
                      disabled={this.state.productStatusdsb}
                    >
                      {Common_JsonData.productStatus && Common_JsonData.productStatus.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                <div className="col-md-4 mb-3">
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
                      disabled={this.state.formdisable}
                    >
                      {Common_JsonData.measuringUnit && Common_JsonData.measuringUnit.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                {/* <div className="col-md-4 mb-3">
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
                </div> */}
              </div> 
              <div className="row product-submit">
                {/* <div > */}
                {/* <button className="btn btn-default"
                  type="reset" onClick={() => { this.props.closeModal(); this.props.dispatch(productActions.resetProduct()); }}>
                  Cancel
                                        </button> */}
                {this.props.mode !== 'view' ? <button className="btn btn-primary link-bg button-style fnt-wght product-submit-btn"
                  type="button" onClick={this.handleSubmit} disabled={this.props.product.loading} >
                  Submit
                </button> : null}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { product } = state;

  return {
    product

  };
}

const connectedRfq = connect(mapStateToProps)(ProductForm);
export { connectedRfq as ProductForm };
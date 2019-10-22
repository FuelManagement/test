import React from 'react';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            lineItem : props.lineItem || {}
        }
    }
    
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        let lineItem = { ...this.state.lineItem };
        lineItem[key] = value;
        this.setState({lineItem});
        this.props.handleLineItemChange(lineItem, this.props.index);
    }
    render() {
        const entitryType = [{
            value: "",
            label: "None"
        }, {
            value: "Exporter",
            label: "Exporter"
        },
        {
            value: "Importer",
            label: "Importer"
        },
        {
            value: "Refinery",
            label: "Refinery"
        }];
        const currencytype = [
            {
                value: "",
                label: "None"
            },
            {
                value: "USD $",
                label: "USD $"
            },
            {
                value: "MEX $",
                label: "MEX $"
            }];
        const quantityunit = [
            {
                value: "",
                label: "None"
            },
            {
                value: "Barrel",
                label: "Barrel"
            },
            {
                value: "Gallon",
                label: "Gallon"
            },
            {
                value: "Litre",
                label: "Litre"
            }];
        return (
            <React.Fragment>
            <hr className="col-12"/>  
            <div className="col-md-12 col-12 row">
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        select
                        id="product"
                        label="Product"
                        onChange={this.handleChange}
                        name="productName"
                        value={this.state.lineItem.productName || ""}
                        variant="outlined"
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    >
                        {entitryType.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        select
                        id="productCategory"
                        label="Category"
                        onChange={this.handleChange}
                        name="productCategory"
                        value={this.state.lineItem.productCategory || ""}
                        variant="outlined"
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    >
                        {entitryType.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        select
                        id="subCategory"
                        label="Sub Category"
                        value={this.state.lineItem.subCategory || ""}
                        onChange={this.handleChange}
                        name="subCategory"
                        variant="outlined"
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    >
                        {entitryType.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        id="quantity"
                        label="Quantity"
                        onChange={this.handleChange}
                        name="quantity"
                        value={this.state.lineItem.quantity || ""}
                        variant="outlined"
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    />
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        id="price"
                        label="Price"
                        onChange={this.handleChange}
                        name="price"
                        variant="outlined"
                        value={this.state.lineItem.price || ""}
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    />
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        id="priceAdjustment"
                        label="Price Adjustment"
                        onChange={this.handleChange}
                        name="priceAdjustment"
                        variant="outlined"
                        value={this.state.lineItem.priceAdjustment || ""}
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    />
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        select
                        id="currency"
                        label="Currency"
                        onChange={this.handleChange}
                        name="currency"
                        variant="outlined"
                        value={this.state.lineItem.currency || ""}
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    >
                        {currencytype.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-3 mb-3 m25">
                    <TextField
                        select
                        id="quantityUnit"
                        label="Quantity Unit"
                        onChange={this.handleChange}
                        name="quantityUnit"
                        variant="outlined"
                        value={this.state.lineItem.quantityUnit || ""}
                        className="form-control"
                        autoComplete="off"
                        margin="dense"
                        disabled={false}
                    >
                        {quantityunit.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-3 mb-3 m25">
                    <button className="btn btn-outline btn-sm" onClick={(e) => this.props.removeLineItem(this.props.index)}>Remove</button>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export { LineItem };
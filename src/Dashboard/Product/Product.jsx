import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config,history } from '../../_helpers';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { productActions } from '../../_actions';
import { ProductForm } from './ProductForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';

library.add(faPlus);
class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            createProductModal: false,
            domain: '',
            mode: this.props.product.mode !== undefined ? this.props.product.mode : 'create'
        } 
        this.addProduct=this.addProduct.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextprops) {
        if (JSON.stringify(this.props.product.mode) !== JSON.stringify(nextprops.product.mode)) {
            this.setState({ mode: nextprops.product.mode })
        }
    }
    componentDidMount() {
        this.props.dispatch(productActions.getAllProduct());
    }
    addProduct(event){ 
        this.props.dispatch(productActions.changeModeProduct('create'));
        history.push('/product/add'); 

    }

    shouldComponentUpdate() {
        return true;
    }
   
    toggleProductModal(e, data, mode) {
        
        this.props.dispatch(productActions.changeModeProduct(mode));
        this.props.dispatch(productActions.getProduct(data));
        this.setState({ createProductModal: !this.state.createProductModal });
        history.push('/product/add'); 

    }

    render() { 
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{ display: "inline-block" }} className="table-main-heading">
                    Product
                </h2>

                <hr />
                <div>
                    {/* <Link to="/product/add"> */}
                        <button name="btnAddProduct" className="btn btn-outline btn-success" 
                         onClick={this.addProduct}
                        //  {e => { this.props.dispatch(productActions.changeModeProduct('create')); }}
                        >
                            <FontAwesomeIcon icon="plus" /> Product
                    </button>
                    {/* </Link> */}

                    {/* <input className="searchBox"
                        type="text" name="search" 
                        value={this.state.search} 
                        onChange={e => this.setState({search:e.target.value})} 
                        placeholder="Search By Name" /> */}
                </div>
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.props.product.products}
                    columns={Table_Config.Product.products.columns({ toggleProductModal: this.toggleProductModal.bind(this) })}
                    {...Table_Config.Product.products.options}
                />

                {/* <hr />
                <br />

                <div className="modal" id="createProductModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="">{this.state.mode === 'create' ? 'Add' : (this.state.mode === 'view' ? 'View' : 'Edit')} Product</h5>
                                <button type="button" className="close" onClick={(e) => this.toggleModal(e)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ProductForm mode={this.state.mode} closeModal={this.toggleModal} />
                            </div>
                        </div>
                    </div>
                </div> */}
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

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };

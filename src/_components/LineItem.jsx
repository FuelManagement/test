import React from 'react';
import MaterialTable from 'material-table';

class LineItem extends React.Component {
    constructor(props) {
      super(props);
      this.productLookup = this.productLookup.bind(this);
      this.getLineItemDetails = this.getLineItemDetails.bind(this);
      this.state = {
        selectedRow: null,
        columns: [
          { title: 'Product', field: 'product', lookup: this.productLookup(props.products && props.products.products),},
          { title: 'Category', field: 'category', editable: 'never' },
          { title: 'Sub Category', field: 'subCategory', editable: 'never' },
          { title: 'Measuring Units', field: 'msgUnits',editable: 'never'},
          { title: 'Quantity', field: 'quantity' },
          { title: 'Price', field: 'price' },
          { title: 'Price Adjustment', field: 'priceAdjustment', editable: 'never'},
        ],
        products: []
      }
    }
    productLookup(products = []){
      let lookup = {};
      products.map((product) => {
        lookup[product.productID]=product.productName;
      })
      return lookup;
    }
    UNSAFE_componentWillReceiveProps(){
      if(this.props.products && this.props.products.products.length){
        let columns = this.state.columns;
        columns[0].lookup = this.productLookup(this.props.products.products);
        this.setState({columns})
      }
    }
    getLineItemDetails(newData){
      let lineItem = {...newData};
      for(let i=0; i<this.props.products.products.length; i++){
        let product = this.props.products.products[i];
        if(product.productID === newData.product) {
          lineItem = {
            ...lineItem,
            product: product.productID,
            category: product.productCategory,
            subCategory: product.subCategory,
            msgUnits: product.measuringUnit,
          }
          break;
        }
      }
      return lineItem
    }
    render() {
      return (
        <MaterialTable  
        onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
        options={{  
            actionsColumnIndex: -1,
            search:false,
            pageSizeOptions:[1,3,5,7], 
            pageSize:3,
            rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
              }),
            headerStyle: {
                backgroundColor: '#00ce1b',
                color: '#FFF',    
                fontSize:"15px",
                fontWeight:'bold'  
              }, 
          }} 
          title=""
          columns={this.state.columns}
          data={this.state.products}
          editable={{     
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                const products = this.state.products;
                products.push(this.getLineItemDetails(newData));
                this.setState({ products }, () => resolve());
                this.props.updateLineItems(products);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const products = this.state.products;
                  const index = products.indexOf(oldData);
                  products[index] = this.getLineItemDetails(newData);
                  this.setState({ products }, () => resolve());
                  this.props.updateLineItems(products);
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  let products = this.state.products;
                  const index = products.indexOf(oldData);
                  products.splice(index, 1);
                  this.setState({ products }, () => resolve());
                  this.props.updateLineItems(products);
                }, 1000)
              }),
          }}
        />
      )
    }
  }
export { LineItem };
import React from 'react';
import MaterialTable from 'material-table';


class LineItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedRow: null,
        columns: [
          {
            title: 'Product',
            field: 'product',
            lookup: { 0: 'Product1', 1: 'Product2' },
          },
          { title: 'Category', field: 'category', editable: 'never' },
          { title: 'Sub Category', field: 'subCategory', editable: 'never' },
          { title: 'Measuring Units', field: 'msgUnits',editable: 'never'},
          { title: 'Quantity', field: 'quantity' },
          { title: 'Price', field: 'price' },
          { title: 'Price Adjustment', field: 'priceAdjustment', editable: 'never'},
        ],
        products: props.products
      }
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
                setTimeout(() => {
                  {
                    const data = this.state.products;
                    data.push(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.products;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.products;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
          }}
        />
      )
    }
  }
export { LineItem };
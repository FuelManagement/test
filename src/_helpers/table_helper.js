import React from 'react';

let globalOptions = {
    showPagination: true,
    showPaginationTop: false,
    showPaginationBottom: true,
    showPageSizeOptions: true,
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    defaultPageSize: 5,
    className: "table table-sm fixed_header",
    sortable: true,
    resizable: true,
    defaultSortDesc: false,
    rowsText: "",
    defaultSortMethod: (a, b, desc) => {
        // force null and undefined to the bottom
        a = a === null || a === undefined ? "" : a;
        b = b === null || b === undefined ? "" : b;
        // force any string values to lowercase
        a = typeof a === "string" ? a.toLowerCase() : a;
        b = typeof b === "string" ? b.toLowerCase() : b;
        // Return either 1 or -1 to indicate a sort priority
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        // returning 0, undefined or any falsey value will use subsequent sorts or
        // the index as a tiebreaker
        return 0;
    }
}

let markChecked = (selectedValues, row) => {
	return Object.keys(selectedValues).indexOf(row.tx_id) > -1;
}
function formatMoney(number, decPlaces, decSep, thouSep) {
	decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
	decSep = typeof decSep === "undefined" ? "." : decSep;
	thouSep = typeof thouSep === "undefined" ? "," : thouSep;
	var sign = number < 0 ? "-" : "";
	var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
	var j = (j = i.length) > 3 ? j % 3 : 0;
	
	return sign +
		(j ? i.substr(0, j) + thouSep : "") +
		i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
		(decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
	}
let Table_Config = {
	Importer: {
		orders: {
			options: {...globalOptions},
			columns: [{
				Header: 'PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			
			},{
				Header: 'PO Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0,10)} >{row.original.timestamp.slice(0,10)}</span>
			
			   // Cell:item=>{item.timestamp.slice(0, 10)}
			},{
				Header: 'Supplier Name',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status === "DispatchedByExporter"?"Fulfilled":"Order Placed"} >{row.original.status === "DispatchedByExporter"?"Fulfilled":"Order Placed"}</span>
				},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell:item=> <span className="fa fa-info-circle fa-2x txn_id" 
				style={{textAlign:'center',display: 'block'}}
					data-container="body" 
					data-toggle="popover" 					
					data-content={item.row.tx_id}>
				</span>
			}]
		}
	},
    Exporter : {
        newCustomerOrders: {
            options: {...globalOptions},
            columns:(props)=> {return [{
				Header: 'Select',
				accessor: '_id',
				Cell: row => <input type="checkbox" style={{horizontalAlign: 'middle',display:'block',margin:'auto'}} checked={markChecked(props.selectedValues, row.row)} onChange={e =>props.onCheck(e,row.row)}/>
			},{
				Header: 'Customer PO',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} >{row.original.PONumber}</span>
			
			},{
				Header: 'Customer Name',
				accessor: 'User_ID',
				Cell: row => <span title={row.original.User_ID} >{row.original.User_ID}</span>
			
			},{
				Header: 'PO Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0,10)} >{row.original.timestamp.slice(0,10)}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row=> <span className="fa fa-info-circle fa-2x txn_id" 
				style={{textAlign:'center',display: 'block'}}
					data-container="body"
					data-toggle="popover" 					
					data-content={row.row.tx_id}>
				</span>
			}]}
		},
		pendingOrderFromSeller: {
			options: {...globalOptions},
			columns:  [{
				Header: 'PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			
			},{
				Header: 'PO Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0,10)} >{row.original.timestamp.slice(0,10)}</span>
			
			},{
				Header: 'Supplier',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>
			
			},{
				Header: 'Customer PO',
				accessor: 'ImporterPONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.ImporterPONumber} style={{textAlign:'right'}}>{row.original.ImporterPONumber}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
				style={{textAlign:'center',display: 'block'}}
					data-container="body" 
					data-toggle="popover"					
					data-content={row.row.tx_id}>
				</span>
			}]
		},
		ordersFulfilled: {
			options: {...globalOptions},
			columns:(props)=>{return [{
				Header: 'Select',
				accessor: '_id',
				Cell: row => <input type="checkbox" style={{horizontalAlign: 'middle',display:'block',margin:'auto'}} checked={markChecked(props.selectedValues, row.row)} onChange={e => props.onCheck(e,row.row)}/>
			},{
				Header: 'PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			
			},{
				Header: 'Customer PO',
				accessor: 'ImporterPONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.ImporterPONumber} style={{textAlign:'right'}}>{row.original.ImporterPONumber}</span>
			
			},{
				Header: 'Refinery',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>
			
			},{
				Header: 'Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0,10)}>{row.original.timestamp.slice(0,10)}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id" 
				style={{textAlign:'center',display: 'block'}}
					data-container="body" 
					data-toggle="popover"					
					data-content={row.row.tx_id}>
				</span>
			},{
				Header: 'Documents',
				accessor: 'documents',
				Cell: row => { 
					if(row.row.documents && row.row.documents.length){
						return <button 
								className="btn btn-info btn-sm button-style"
								style={{horizontalAlign: 'middle',display:'block',margin:'auto'}}
								onClick={e=>{props.toggleDocumentModal(e, row.row, true)}}>
									View
							</button>
					}
					else return "No Documents"
				}
			}]}
		},
		ordersFulfilledToCustomer: {
			options: {...globalOptions},
			columns: (props) => [{
				Header: 'PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			
			},{
				Header: 'Customer PO',
				accessor: 'ImporterPONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.ImporterPONumber} style={{textAlign:'right'}}>{row.original.ImporterPONumber}</span>
			
			},{
				Header: 'Refinery',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>
			
			},{
				Header: 'Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)} >{row.original.timestamp.slice(0, 10)}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id" 
				style={{textAlign:'center',display: 'block'}}
					data-container="body" 
					data-toggle="popover" 
					data-placement="right" 
					data-content={row.row.tx_id}>
				</span>
			},{
				Header: 'Documents',
				accessor: 'documents',
				Cell: row => { 
					if(row.row.documents && row.row.documents.length){
						return <button 
								className="btn btn-info btn-sm button-style"								
								style={{horizontalAlign: 'middle',display:'block',margin:'auto'}}
								onClick={e=>{props.toggleDocumentModal(e, row.row, true)}}>
									View
							</button>
					}
					else return "No Documents"
				}
			}]
		},
	},
	Refinery: {
		pendingOrders: {
			options: {...globalOptions},
			columns:(props) => [{
				Header: 'Select',
				accessor: '_id',
				Cell: row => <input type="checkbox" style={{horizontalAlign: 'middle',display:'block',margin:'auto'}}  checked={markChecked(props.selectedValues, row.row)} onChange={e => props.onCheck(e,row.row)}/>
			},{
				Header: 'Customer PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			
			},{
				Header: 'PO Date',
				accessor: 'timestamp',
			   // Cell:item=>{item.timestamp.slice(0, 10)}
			   Cell: row => <span title={row.original.timestamp.slice(0, 10)}>{row.original.timestamp.slice(0, 10)}</span>
			
			},{
				Header: 'Name',
				accessor: 'User_ID',
				Cell: row => <span title={row.original.User_ID} >{row.original.User_ID}</span>
			
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>
			
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.quantity} style={{textAlign:'right'}}>{row.original.quantity}</span>
			
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span title={formatMoney(row.original.price)} style={{textAlign:'right'}}>{formatMoney(row.original.price)}</span>
			
			},{
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id" 
				style={{textAlign:'center',display: 'block'}}
					data-container="body" 
					data-toggle="popover" 					
					data-content={row.row.tx_id}>
				</span>
			}]
		},
		dispatchedOrders: {
			options: {...globalOptions},
			columns:(props)=>[{
				Header: 'Customer PO #',
				accessor: 'PONumber',
				style:{textAlign:'right'},
				Cell: row => <span title={row.original.PONumber} style={{textAlign:'right'}}>{row.original.PONumber}</span>
			},{
				Header: 'Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)}>{row.original.timestamp.slice(0, 10)}</span>			   
			},{
				Header: 'Name',
				accessor: 'User_ID',
				Cell: row => <span title={row.original.User_ID}>{row.original.User_ID}</span>
			},{
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product}>{row.original.product}</span>
			},{
				Header: 'Quantity',
				accessor: 'quantity',
				style:{textAlign:'right'},
				Cell: row => <span style={{textAlign:'right'}} title={row.original.quantity}>{row.original.quantity}</span>
			},{
				Header: 'Price',
				accessor: 'price',
				style:{textAlign:'right'},
				Cell: row => <span style={{textAlign:'right'}} title={formatMoney(row.original.price)}>{formatMoney(row.original.price)}</span>
			},{
				Header: 'Documents',
				accessor: 'documents',
				Cell: row => { 
					if(row.row.documents && row.row.documents.length){
						return <button 
								className="btn btn-info btn-sm button-style"
								style={{horizontalAlign: 'middle',display:'block',margin:'auto'}}
								onClick={e=>{props.toggleDocumentModal(e, row.row, true)}}>
									View
							</button>
					}
					else return "No Documents"
				}
			}]
		}
	},
	Boarder:{
		participants:{
			options:{...globalOptions},
			columns:[{
				Header: 'Name',
				accessor: 'organisation',
				Cell: row => <span title={row.original.organisation}>{row.original.organisation}</span>
			},{
				Header: 'Address',
				accessor: 'streetAddress',
				Cell: row => <span title={row.original.streetAddress+' '+row.original.City+' '+row.original.State+' '+row.original.country+' '+row.original.zip}>{row.original.streetAddress+' '+row.original.City+' '+row.original.State+' '+row.original.country+' '+row.original.zip}</span>
				
			},{
				Header: 'Type',
				accessor: 'participantType',
				Cell: row => <span title={row.original.participantType}>{row.original.participantType}</span>
			},{
				Header: 'Domain',
				accessor: 'domain',
				Cell: row => <span title={row.original.domain}>{row.original.domain}</span>
			},{
				Header: 'Owner',
				accessor: 'owner',
				Cell: row => <span title={ row.original.firstName+' '+row.original.lastName}>{ row.original.firstName+' '+row.original.lastName}</span>
			},{
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status===0?'Active':'Inactive'}>{row.original.status===0?'Active':'Inactive'}</span>
			}]
		}
	}
}

module.exports = { Table_Config };
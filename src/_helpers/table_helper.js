import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { dateutility } from './date_helpers';
import { formatutility } from './format_helpers';
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faEye, faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

// library.add(faEye, faEdit, faCheckSquare);
let user = JSON.parse(localStorage.getItem('user'));

let globalOptions = {
	showPagination: true,
	showPaginationTop: false,
	showPaginationBottom: true,
	showPageSizeOptions: false,
	pageSizeOptions: [5, 10, 20, 25, 50, 100],
	defaultPageSize: 5,
	className: "table table-sm fixed_header",
	sortable: true,
	resizable: true,
	defaultSortDesc: false,
	rowsText: "",
	className:"-striped -highlight",
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
			options: { ...globalOptions },
			columns: [{
				Header: 'PO #',
				accessor: 'PONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>

			}, {
				Header: 'PO Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)} >{row.original.timestamp.slice(0, 10)}</span>

				// Cell:item=>{item.timestamp.slice(0, 10)}
			}, {
				Header: 'Supplier Name',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>

			}, {
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>

			}, {
				Header: 'Quantity',
				accessor: 'quantity',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

			}, {
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

			}, {
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status === "DispatchedByExporter" ? "Fulfilled" : "Order Placed"} >{row.original.status === "DispatchedByExporter" ? "Fulfilled" : "Order Placed"}</span>
			}, {
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: item => <span className="fa fa-info-circle fa-2x txn_id"
					style={{ textAlign: 'center', display: 'block' }}
					data-container="body"
					data-toggle="popover"
					data-content={item.row.tx_id}>
				</span>
			}]
		}
	},
	Exporter: {
		newCustomerOrders: {
			options: { ...globalOptions },
			columns: (props) => {
				return [{
					Header: 'Select',
					accessor: '_id',
					Cell: row => <input type="checkbox" style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }} checked={markChecked(props.selectedValues, row.row)} onChange={e => props.onCheck(e, row.row)} />
				}, {
					Header: 'Customer PO',
					accessor: 'PONumber',
					style: { textAlign: 'right' },
					Cell: row => <span title={row.original.PONumber} >{row.original.PONumber}</span>

				}, {
					Header: 'Customer Name',
					accessor: 'User_ID',
					Cell: row => <span title={row.original.User_ID} >{row.original.User_ID}</span>

				}, {
					Header: 'PO Date',
					accessor: 'timestamp',
					Cell: row => <span title={row.original.timestamp.slice(0, 10)} >{row.original.timestamp.slice(0, 10)}</span>

				}, {
					Header: 'Product',
					accessor: 'product',
					Cell: row => <span title={row.original.product} >{row.original.product}</span>

				}, {
					Header: 'Quantity',
					accessor: 'quantity',
					style: { textAlign: 'right' },
					Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

				}, {
					Header: 'Price',
					accessor: 'price',
					style: { textAlign: 'right' },
					Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

				}, {
					Header: 'TXN ID',
					accessor: 'tx_id',
					Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
						style={{ textAlign: 'center', display: 'block' }}
						data-container="body"
						data-toggle="popover"
						data-content={row.row.tx_id}>
					</span>
				}]
			}
		},
		pendingOrderFromSeller: {
			options: { ...globalOptions },
			columns: [{
				Header: 'PO #',
				accessor: 'PONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>

			}, {
				Header: 'PO Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)} >{row.original.timestamp.slice(0, 10)}</span>

			}, {
				Header: 'Supplier',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>

			}, {
				Header: 'Customer PO',
				accessor: 'ImporterPONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.ImporterPONumber} style={{ textAlign: 'right' }}>{row.original.ImporterPONumber}</span>

			}, {
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>

			}, {
				Header: 'Quantity',
				accessor: 'quantity',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

			}, {
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

			}, {
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
					style={{ textAlign: 'center', display: 'block' }}
					data-container="body"
					data-toggle="popover"
					data-content={row.row.tx_id}>
				</span>
			}]
		},
		ordersFulfilled: {
			options: { ...globalOptions },
			columns: (props) => {
				return [{
					Header: 'Select',
					accessor: '_id',
					Cell: row => <input type="checkbox" style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }} checked={markChecked(props.selectedValues, row.row)} onChange={e => props.onCheck(e, row.row)} />
				}, {
					Header: 'PO #',
					accessor: 'PONumber',
					style: { textAlign: 'right' },
					Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>

				}, {
					Header: 'Customer PO',
					accessor: 'ImporterPONumber',
					style: { textAlign: 'right' },
					Cell: row => <span title={row.original.ImporterPONumber} style={{ textAlign: 'right' }}>{row.original.ImporterPONumber}</span>

				}, {
					Header: 'Refinery',
					accessor: 'POFrom',
					Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>

				}, {
					Header: 'Date',
					accessor: 'timestamp',
					Cell: row => <span title={row.original.timestamp.slice(0, 10)}>{row.original.timestamp.slice(0, 10)}</span>

				}, {
					Header: 'Product',
					accessor: 'product',
					Cell: row => <span title={row.original.product} >{row.original.product}</span>

				}, {
					Header: 'Quantity',
					accessor: 'quantity',
					style: { textAlign: 'right' },
					Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

				}, {
					Header: 'Price',
					accessor: 'price',
					style: { textAlign: 'right' },
					Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

				}, {
					Header: 'TXN ID',
					accessor: 'tx_id',
					Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
						style={{ textAlign: 'center', display: 'block' }}
						data-container="body"
						data-toggle="popover"
						data-content={row.row.tx_id}>
					</span>
				}, {
					Header: 'Documents',
					accessor: 'documents',
					Cell: row => {
						if (row.row.documents && row.row.documents.length) {
							return <button
								className="btn btn-success btn-sm button-style"
								style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
								onClick={e => { props.toggleDocumentModal(e, row.row, true) }}>
								View
							</button>
						}
						else return "No Documents"
					}
				}]
			}
		},
		ordersFulfilledToCustomer: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'PO #',
				accessor: 'PONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>

			}, {
				Header: 'Customer PO',
				accessor: 'ImporterPONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.ImporterPONumber} style={{ textAlign: 'right' }}>{row.original.ImporterPONumber}</span>

			}, {
				Header: 'Refinery',
				accessor: 'POFrom',
				Cell: row => <span title={row.original.POFrom} >{row.original.POFrom}</span>

			}, {
				Header: 'Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)} >{row.original.timestamp.slice(0, 10)}</span>

			}, {
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>

			}, {
				Header: 'Quantity',
				accessor: 'quantity',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

			}, {
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

			}, {
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
					style={{ textAlign: 'center', display: 'block' }}
					data-container="body"
					data-toggle="popover"
					data-placement="right"
					data-content={row.row.tx_id}>
				</span>
			}, {
				Header: 'Documents',
				accessor: 'documents',
				Cell: row => {
					if (row.row.documents && row.row.documents.length) {
						return <button
							className="btn btn-success btn-sm button-style"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleDocumentModal(e, row.row, true) }}>
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
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Select',
				accessor: '_id',
				Cell: row => <input type="checkbox" style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }} checked={markChecked(props.selectedValues, row.row)} onChange={e => props.onCheck(e, row.row)} />
			}, {
				Header: 'Customer PO #',
				accessor: 'PONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>

			}, {
				Header: 'PO Date',
				accessor: 'timestamp',
				// Cell:item=>{item.timestamp.slice(0, 10)}
				Cell: row => <span title={row.original.timestamp.slice(0, 10)}>{row.original.timestamp.slice(0, 10)}</span>

			}, {
				Header: 'Name',
				accessor: 'User_ID',
				Cell: row => <span title={row.original.User_ID} >{row.original.User_ID}</span>

			}, {
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product} >{row.original.product}</span>

			}, {
				Header: 'Quantity',
				accessor: 'quantity',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.quantity} style={{ textAlign: 'right' }}>{row.original.quantity}</span>

			}, {
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span title={formatMoney(row.original.price)} style={{ textAlign: 'right' }}>{formatMoney(row.original.price)}</span>

			}, {
				Header: 'TXN ID',
				accessor: 'tx_id',
				Cell: row => <span className="fa fa-info-circle fa-2x txn_id"
					style={{ textAlign: 'center', display: 'block' }}
					data-container="body"
					data-toggle="popover"
					data-content={row.row.tx_id}>
				</span>
			}]
		},
		dispatchedOrders: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Customer PO #',
				accessor: 'PONumber',
				style: { textAlign: 'right' },
				Cell: row => <span title={row.original.PONumber} style={{ textAlign: 'right' }}>{row.original.PONumber}</span>
			}, {
				Header: 'Date',
				accessor: 'timestamp',
				Cell: row => <span title={row.original.timestamp.slice(0, 10)}>{row.original.timestamp.slice(0, 10)}</span>
			}, {
				Header: 'Name',
				accessor: 'User_ID',
				Cell: row => <span title={row.original.User_ID}>{row.original.User_ID}</span>
			}, {
				Header: 'Product',
				accessor: 'product',
				Cell: row => <span title={row.original.product}>{row.original.product}</span>
			}, {
				Header: 'Quantity',
				accessor: 'quantity',
				style: { textAlign: 'right' },
				Cell: row => <span style={{ textAlign: 'right' }} title={row.original.quantity}>{row.original.quantity}</span>
			}, {
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span style={{ textAlign: 'right' }} title={formatMoney(row.original.price)}>{formatMoney(row.original.price)}</span>
			}, {
				Header: 'Documents',
				accessor: 'documents',
				Cell: row => {
					if (row.row.documents && row.row.documents.length) {
						return <button
							className="btn btn-success btn-sm button-style"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleDocumentModal(e, row.row, true) }}>
							View
							</button>
					}
					else return "No Documents"
				}
			}]
		}
	},
	Boarder: {
		participants: {
			options: { ...globalOptions },
			columns: [{
				Header: 'Name',
				accessor: 'organisation',
				Cell: row => <span title={row.original.organisation}>{row.original.organisation}</span>
			}, {
				Header: 'Address',
				accessor: 'streetAddress',
				Cell: row => <span title={row.original.streetAddress + ' ' + row.original.City + ' ' + row.original.State + ' ' + row.original.country + ' ' + row.original.zip}>{row.original.streetAddress + ' ' + row.original.City + ' ' + row.original.State + ' ' + row.original.country + ' ' + row.original.zip}</span>

			}, {
				Header: 'Type',
				accessor: 'participantType',
				Cell: row => <span title={row.original.participantType}>{row.original.participantType}</span>
			}, {
				Header: 'Domain',
				accessor: 'domain',
				Cell: row => <span title={row.original.domain}>{row.original.domain}</span>
			}, {
				Header: 'Owner',
				accessor: 'owner',
				Cell: row => <span title={row.original.firstName + ' ' + row.original.lastName}>{row.original.firstName + ' ' + row.original.lastName}</span>
			}, {
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status === 0 ? 'Active' : 'Inactive'}>{row.original.status === 0 ? 'Active' : 'Inactive'}</span>
			}]
		}
	},
	Product: {
		products: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Category',
				accessor: 'productCategory',
				Cell: row => <span title={row.original.productCategory}>{row.original.productCategory}</span>
			}, {
				Header: 'Sub Category',
				accessor: 'subCategory',
				Cell: row => <span title={row.original.subCategory}>{row.original.subCategory}</span>
			},
			{
				Header: 'Name',
				accessor: 'productName',
				Cell: row => <span title={row.original.productName}>{row.original.productName}</span>
			},
			{
				Header: 'Price',
				accessor: 'price',
				style: { textAlign: 'right' },
				Cell: row => <span title={formatMoney(row.original.price)}>{formatMoney(row.original.price)}</span>
			}, {
				Header: 'Measuring Unit',
				accessor: 'quantityUnit',
				Cell: row => <span title={row.original.measuringUnit}>{row.original.measuringUnit}</span>
			}, {
				Header: 'Currency',
				accessor: 'currency',
				Cell: row => <span title={row.original.currency}>{row.original.currency}</span>
			}, {
				Header: 'Status',
				accessor: 'productStatus',
				Cell: row => <span title={row.original.productStatus == 'true' ? 'Active' : 'Inactive'}>{row.original.productStatus == 'true' ? 'Active' : 'Inactive'}</span>
			},
			{
				Header: 'Action',
				accessor: 'productName',
				Cell: row => <div className="row">
					<button
						className="btn btn-outline-info btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleProductModal(e, row.original, 'view') }}>
						<FontAwesomeIcon icon="eye" size="xs" />
					</button>
					<button
						className="btn btn-outline-primary btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleProductModal(e, row.original, 'update') }}>
						<FontAwesomeIcon icon="edit" size="xs" />
					</button>
				</div>
			}]
		}
	},
	SupplierRFQ: {
		rfqs: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Project ID',
				accessor: 'rfqID',
				Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
			},
			{
				Header: 'Supplier Name',
				accessor: 'participant_name',
				Cell: row => <span title={row.original.participant_name}>{row.original.participant_name}</span>
			},
			{
				Header: 'Entity Type',
				accessor: 'entityType',
				Cell: row => <span title={row.original.entityType}>{row.original.entityType}</span>
			}, {
				Header: 'Start Time',
				accessor: 'startTime',
				Cell: row => <span title={row.original.startTime}>{row.original.startTime}</span>
			}, {
				Header: 'End Time',
				accessor: 'endTime',
				Cell: row => <span title={row.original.endTime}>{row.original.endTime}</span>
			}, {
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status}>{row.original.status}</span>
			},
			// {
			// 	Header: 'Activation Time',
			// 	accessor: 'activationTime',
			// 	Cell: row => <span title={row.original.activationTime}>{row.original.activationTime}</span>
			// },{
			// 	Header: 'Closer Time',
			// 	accessor: 'closerTime',
			// 	Cell: row => <span title={row.original.closerTime}>{row.original.closerTime}</span>
			// },
			{
				Header: 'Currency',
				accessor: 'currency',
				Cell: row => <span title={row.original.currency}>{row.original.currency}</span>
			}, {
				Header: 'Actions',
				accessor: 'productName',
				Cell: row => <div className="row">
					<button
						className="btn btn-outline-info btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleRfqModal(e, row.original, "view") }}>
						<FontAwesomeIcon icon="eye" size="xs" />
					</button>
					<button
						className="btn btn-outline-primary btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleRfqModal(e, row.original, "edit") }}>
						<FontAwesomeIcon icon="edit" size="xs" />
					</button>
				</div>
			}]
		}
	},
	CustomerRFQ: {
		rfqs: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Project ID',
				accessor: 'rfqID',
				Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
			},
			{
				Header: 'Customer Name',
				accessor: 'participant_name',
				Cell: row => <span title={row.original.participant_name}>{row.original.participant_name}</span>
			},
			{
				Header: 'Entity Type',
				accessor: 'entityType',
				Cell: row => <span title={row.original.entityType}>{row.original.entityType}</span>
			}, {
				Header: 'Start Time',
				accessor: 'startTime',
				Cell: row => <span title={row.original.startTime}>{row.original.startTime}</span>
			}, {
				Header: 'End Time',
				accessor: 'endTime',
				Cell: row => <span title={row.original.endTime}>{row.original.endTime}</span>
			}, {
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span title={row.original.status}>{row.original.status}</span>
			},
			// {
			// 	Header: 'Activation Time',
			// 	accessor: 'activationTime',
			// 	Cell: row => <span title={row.original.activationTime}>{row.original.activationTime}</span>
			// },{
			// 	Header: 'Closer Time',
			// 	accessor: 'closerTime',
			// 	Cell: row => <span title={row.original.closerTime}>{row.original.closerTime}</span>
			// },
			{
				Header: 'Currency',
				accessor: 'currency',
				Cell: row => <span title={row.original.currency}>{row.original.currency}</span>
			}, {
				Header: 'Actions',
				accessor: 'productName',
				Cell: row => <div className="row">
					<button
						className="btn btn-outline-info btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleRfqModal(e, row.original, "view") }}>
						<FontAwesomeIcon icon="eye" size="xs" />
					</button>
					<button
						className="btn btn-outline-primary btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.toggleRfqModal(e, row.original, "edit") }}>
						<FontAwesomeIcon icon="edit" size="xs" />
					</button>
				</div>
			}]
		}
	},
	IndicativeOfferCustomer: {
		indicativeOffers: {
			options: { ...globalOptions },
			columns: (props) => [
				{
					Header: 'Indicative ID',
					accessor: 'rfqID',
					Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
				},
				{
					Header: 'Project ID',
					accessor: 'rfqID',
					Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
				},
				{
					Header: 'Supplier Name',
					accessor: 'participant_name',
					Cell: row => <span title={row.original.participant_name}>{row.original.participant_name}</span>
				},
				{
					Header: 'Entity Type',
					accessor: 'entityType',
					Cell: row => <span title={row.original.entityType}>{row.original.entityType}</span>
				}, {
					Header: 'Start Time',
					accessor: 'startTime',
					Cell: row => <span title={row.original.startTime}>{row.original.startTime}</span>
				}, {
					Header: 'End Time',
					accessor: 'endTime',
					Cell: row => <span title={row.original.endTime}>{row.original.endTime}</span>
				}, {
					Header: 'Status',
					accessor: 'status',
					Cell: row => <span title={row.original.status}>{row.original.status}</span>
				},
				// {
				// 	Header: 'Activation Time',
				// 	accessor: 'activationTime',
				// 	Cell: row => <span title={row.original.activationTime}>{row.original.activationTime}</span>
				// },{
				// 	Header: 'Closer Time',
				// 	accessor: 'closerTime',
				// 	Cell: row => <span title={row.original.closerTime}>{row.original.closerTime}</span>
				// },
				{
					Header: 'Currency',
					accessor: 'currency',
					Cell: row => <span title={row.original.currency}>{row.original.currency}</span>
				}, {
					Header: 'Actions',
					accessor: 'productName',
					Cell: row => <div className="row">
						<button
							className="btn btn-outline-info btn-sm"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleRfqModal(e, row.original, "view") }}>
							<FontAwesomeIcon icon="eye" size="xs" />
						</button>
						<button
							className="btn btn-outline-primary btn-sm"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleRfqModal(e, row.original, "edit") }}>
							<FontAwesomeIcon icon="edit" size="xs" />
						</button>
					</div>
				}]
		}
	},
	IndicativeOfferSupplier: {
		indicativeOffers: {
			options: { ...globalOptions },
			columns: (props) => [
				{
					Header: 'Indicative ID',
					accessor: 'rfqID',
					Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
				},
				{
					Header: 'Project ID',
					accessor: 'rfqID',
					Cell: row => <span title={row.original.rfqID}>{row.original.rfqID}</span>
				},
				{
					Header: 'Supplier Name',
					accessor: 'participant_name',
					Cell: row => <span title={row.original.participant_name}>{row.original.participant_name}</span>
				},
				{
					Header: 'Entity Type',
					accessor: 'entityType',
					Cell: row => <span title={row.original.entityType}>{row.original.entityType}</span>
				}, {
					Header: 'Start Time',
					accessor: 'startTime',
					Cell: row => <span title={row.original.startTime}>{row.original.startTime}</span>
				}, {
					Header: 'End Time',
					accessor: 'endTime',
					Cell: row => <span title={row.original.endTime}>{row.original.endTime}</span>
				}, {
					Header: 'Status',
					accessor: 'status',
					Cell: row => <span title={row.original.status}>{row.original.status}</span>
				},
				// {
				// 	Header: 'Activation Time',
				// 	accessor: 'activationTime',
				// 	Cell: row => <span title={row.original.activationTime}>{row.original.activationTime}</span>
				// },{
				// 	Header: 'Closer Time',
				// 	accessor: 'closerTime',
				// 	Cell: row => <span title={row.original.closerTime}>{row.original.closerTime}</span>
				// },
				{
					Header: 'Currency',
					accessor: 'currency',
					Cell: row => <span title={row.original.currency}>{row.original.currency}</span>
				}, {
					Header: 'Actions',
					accessor: 'productName',
					Cell: row => <div className="row">
						<button
							className="btn btn-outline-info btn-sm"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleRfqModal(e, row.original, "view") }}>
							<FontAwesomeIcon icon="eye" size="xs" />
						</button>
						<button
							className="btn btn-outline-primary btn-sm"
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
							onClick={e => { props.toggleRfqModal(e, row.original, "edit") }}>
							<FontAwesomeIcon icon="edit" size="xs" />
						</button>
					</div>
				}]
		}
	},
	Participant: {
		participants: {
			options: { ...globalOptions },
			columns: (props) => [
				{
					Header: 'Organization Name',
					accessor: 'domain',
					Cell: row => <span title={row.original.domain}>{row.original.domain}</span>
				},
				{
					Header: 'Email Id',
					accessor: 'registerId',
					Cell: row => <span title={row.original.registerId}>{row.original.registerId}</span>
				},
				{
					Header: 'Business type ',
					accessor: 'BuisnessType',
					Cell: row => <span title={row.original.BuisnessType}>{row.original.BuisnessType}</span>
				},

				{
					Header: 'Entity Type',
					accessor: 'participantType',
					Cell: row => <span title={row.original.participantType}>{row.original.participantType}</span>
				}, {
					Header: 'Status',
					accessor: 'status',
					Cell: row => <span title={row.original.status !== 0 ? 'Approved' : 'Pending'}>{row.original.status !== 0 ? 'Approved' : 'Pending'}</span>
				},
				{
					Header: 'Action',
					accessor: 'participantName',
					Cell: row =>
						<div className="row onBoarding-action-row">
							<button
								className="btn btn-outline-info btn-sm"
								style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
								onClick={e => { props.toggleParticipantModal(e, row.original._id, 'view') }}>
								<FontAwesomeIcon icon="eye" size="xs" />
							</button>
							<button
								className="btn btn-outline-primary btn-sm"
								style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
								onClick={e => { props.toggleParticipantModal(e, row.original._id, 'update') }}>
								<FontAwesomeIcon icon="edit" size="xs" />
							</button>
							{row.original.status === 0 ?
								(<button disabled={row.original.isIdentityCreated}
									className="btn btn-outline-success btn-sm"
									style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
									onClick={e => {
										props.approveParticipant(e, {
											"email": user.email,
											"registerId": row.original.registerId,

										}, 'approve')
									}}>
									{/* <FontAwesomeIcon icon="check-square" size="xs"/>*/} Approve
						</button>) : ""
							}
						</div>
				}]
		}
	},
	UserProfiles: {
		userProfile: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Name',
				accessor: 'first_Name',
				Cell: row => <span title={row.original.first_Name + ' '  + row.original.last_Name}>{row.original.first_Name + ' ' +  row.original.last_Name}</span>
			}, {
				Header: 'Organization Name',
				accessor: 'participantName',
				Cell: row => <span title={row.original.participantName}>{row.original.participantName}</span>
			}, {
				Header: 'Role',
				accessor: 'role',
				Cell: row => <span title={row.original.role}>{row.original.role}</span>
			}, {
				Header: 'Email ID',
				accessor: 'email',
				Cell: row => <span title={row.original.email}>{row.original.email === "admin@certum.com" ? " ":row.original.email}</span>
			}, {
				Header: 'Actions',
				accessor: 'participantID',
				Cell: row => <div className="row">
					<button
						className="btn btn-outline-info btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.editUserProfile(e, row.original, "view") }}>
						<FontAwesomeIcon icon="eye" size="xs" />
					</button>
					<button
						className="btn btn-outline-primary btn-sm"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						onClick={e => { props.editUserProfile(e, row.original, "update") }}>
						<FontAwesomeIcon icon="edit" size="xs" />
					</button>
				</div>
			}]
		}
	},
	OrderTrackingRecords: {
		OrderTrackingRecord: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Order #',
				headerClassName:'react-table-header-style',
				accessor: 'poNumber',
				Cell: row => <span className="react-table-row-content-align-left" title={row.original.poNumber}>{row.original.poNumber}</span>
			}, {
				Header: 'Product Name',
				headerClassName:'react-table-header-style',
				accessor: 'productName',
				Cell: row => <span className="react-table-row-content-align-left" title={row.original.productName}>{row.original.productName}</span>
			}, {
				Header: 'Supplier Name',
				headerClassName:'react-table-header-style',
				accessor: 'supplierName',
				Cell: row => <span className="react-table-row-content-align-left"			
			    title={row.original.supplierName}>{row.original.supplierName}</span>
			}, {
				Header: 'Status',
				headerClassName:'react-table-header-style',
				accessor: 'orderTrackingStatus',
				Cell: row => <span className="react-table-row-content-align-left" style={{ fontWeight: 'normal',
				color:row.original.orderTrackingStatus === "Approved" ? 'Green':(row.original.orderTrackingStatus === "Rejected"?'red':'#17da38')  }} title={row.original.orderTrackingStatus}>{row.original.orderTrackingStatus}</span>
			}, {
				Header: 'Track Request',
				headerClassName:'react-table-header-style',
				accessor: 'orderTrackingStatus',
				Cell: row => <div className="row">
					<button
						className="btn btn-outline-info btn-sm btn-track"
						style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}
						// disabled={row.original.status==='Approved'?false:(row.original.status===''?false:true)}
						onClick={e => { props.trackBtnClk(e, row.original,row.original.orderTrackingStatus==='Approved'? "track":
						(row.original.orderTrackingStatus==='Auto Approved'?"track":"otp-disabled")) }}
					>
						{row.original.orderTrackingStatus===''?'Track':'Track'}
					</button>

				</div>
			}]
		}
	},
	OrderTrackingRequestRecords: {
		OrderTrackingRequestRecord: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Customer Name',
				accessor: 'CustomerParticipantName',
				headerClassName:'react-table-header-style',
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.CustomerParticipantName}>{row.original.CustomerParticipantName}</span>
			}, {
				Header: 'Requested By',
				accessor: 'CustomerName',
				headerClassName:'react-table-header-style',
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.CustomerName}>{row.original.CustomerName.replace(/([A-Z])/g, ' $1').trim()}</span>
			}, {
				Header: 'Owner',
				accessor: 'userRole',
				headerClassName:'react-table-header-style',
				maxWidth: 100,
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.userRole}>
					{row.original.userRole === "Admin" ? "Yes":"No"}</span>
			}, {
				Header: 'Status',
				accessor: 'status',
				headerClassName:'react-table-header-style',
				Cell: row => <span style={{ display: 'block', textAlign: 'left',
				color:row.original.status === "Approved" || row.original.status === "Auto Approved"?'Green':(row.original.status === "Rejected"?'red':'orange') }}
				 title={row.original.status.replace(/([A-Z])/g, ' $1').trim()}>{row.original.status.replace(/([A-Z])/g, ' $1').trim()}</span>
			}, {
				Header: 'Request Timings',
				accessor: 'createdOn',
				headerClassName:'react-table-header-style',				
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={dateutility.datefunction(row.original.createdOn,formatutility.MMDDYYYYHHMMSS)}>
					{dateutility.datefunction(row.original.createdOn,formatutility.MMDDYYYYHHMMSS)}</span>
			}, {
				Header: 'Approve/Reject',
				accessor: 'Approvereject',
				headerClassName:'react-table-header-style',
				Cell: row => <div className="row OTR-actions-row">
					{
						row.original.status === "Auto Approved" ?
						(<button
							className="btn OTR-approve-btn"
							disabled={true}
							style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}>
								Approve
						</button>  )
						// : row.original.Status === "Rejected" ?
						// (<button
						// 	className="btn OTR-reject-btn"
						// 	disabled={true}
						// 	style={{ horizontalAlign: 'middle', display: 'block', margin: 'auto' }}>
						// 		Reject
						// </button>  )
						: (
								<FormControl className="OTR-actions" >
								<Select
									id="demo-simple-select"
									value={ row.original.status ==='Rejected'?'Reject':
									(row.original .status==='Approved'?'Approve':row.original.Approvereject) }
									onChange={(e)=>props.approveSubmit(e, row.original)}
								>
									<MenuItem value="Approve">Approve</MenuItem>
									<MenuItem value="Reject">Reject</MenuItem>
								</Select>
							</FormControl>
						)
					}
				</div>
			}]
		}
	},
	ManageGPSTable: {
		ManageGPSTableRecords: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Customer Name',
				accessor: 'customerParticipantName',
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.customerName}>{row.original.customerName}</span>
			}, {
				Header: 'Order #',
				accessor: 'orderId',
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.orderId}>{row.original.orderId}</span>
			}, 
			 {
				Header: 'Status',
				accessor: 'status',
				Cell: row => <span style={{ display: 'block', textAlign: 'left',fontWeight: 'bold'  ,color:
				row.original.status === "Approved" ?'#29AD01': 'red'  }} title={row.original.status}>{row.original.status}</span>
			}, {
				Header: 'Date',
				accessor: 'date',
				Cell: row => <span style={{ display: 'block', textAlign: 'left' }} title={row.original.date}>{dateutility.datefunction(row.original.date,formatutility.MMDDYYYYHHMMSS)}</span>
			}]
		}
	},
	ProgressBar: {
		ProgressBarRecords: {
			options: { ...globalOptions },
			columns: (props) => [{
				Header: 'Device Id',
				accessor: 'Device',
			}, {
				Header: 'TxnCode',
				accessor: 'TxnCode',
			}, {
				Header: 'TxnId',
				accessor: 'TxnId',
			}, {
				Header: 'Txn Hash',
				accessor: 'TxnHash',
			}, {
				Header: 'Channel Id',
				accessor: 'ChannelId',
			}, {
				Header: 'Block',
				accessor: 'Block',
			}, {
				Header: 'Age',
				accessor: 'Age',
			}, {
				Header: 'From',
				accessor: 'From',
			}, {
				Header: 'To',
				accessor: 'To',
			}]
		}
	},

}

module.exports = { Table_Config };
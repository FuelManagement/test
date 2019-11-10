import { exporterConstants } from '../_constants';
import { exporterService } from '../_services';
import { alertActions } from '../_actions';
export const exporterActions = {
    getAllPo,
    getAllPendingSupplierPO,
    getAllToDispatch,
    getAllDispatched,
    createRefineryPO,
    dispatchOrder
};

function getAllPo() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        exporterService.getAllPo()
            .then(
                orders => { 
                    dispatch(success(orders));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: exporterConstants.EXP_GETALL_PO_REQUEST } }
    function success(orders) { return { type: exporterConstants.EXP_GETALL_PO_SUCCESS, orders } }
    function failure(error) { return { type: exporterConstants.EXP_GETALL_PO_FAILURE, error } }
}

function getAllPendingSupplierPO() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        exporterService.getAllSupplierPo()
            .then(
                orders => {
                    dispatch(success(orders));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: exporterConstants.EXP_GETALL_SUPPLIER_PO_REQUEST } }
    function success(orders) { return { type: exporterConstants.EXP_GETALL_SUPPLIER_PO_SUCCESS, orders } }
    function failure(error) { return { type: exporterConstants.EXP_GETAL_SUPPLIER_PO_FAILURE, error } }
}

function getAllToDispatch() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        exporterService.getAllToDispatch()
            .then(
                orders => { 
                    dispatch(success(orders));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: exporterConstants.EXP_GETALL_TD_REQUEST } }
    function success(orders) { return { type: exporterConstants.EXP_GETALL_TD_SUCCESS, orders } }
    function failure(error) { return { type: exporterConstants.EXP_GETALL_TD_FAILURE, error } }
}

function getAllDispatched() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        exporterService.getAllDispatched()
            .then(
                orders => { 
                    dispatch(success(orders));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: exporterConstants.EXP_GETALL_DISPATCHED_REQUEST } }
    function success(orders) { return { type: exporterConstants.EXP_GETALL_DISPATCHED_SUCCESS, orders } }
    function failure(error) { return { type: exporterConstants.EXP_GETALL_DISPATCHED_FAILURE, error } }
}

function createRefineryPO(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        exporterService.createRefineryPO(formData)
            .then( order => { 
                dispatch(success(order));
                dispatch(getAllPendingSupplierPO());
                dispatch(alertActions.success('Order Created !'));
            })
            .then(()=>dispatch(getAllPo()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: exporterConstants.EXP_CREATE_PO_REQUEST } }
    function success(order) { return { type: exporterConstants.EXP_CREATE_PO_SUCCESS, order } }
    function failure(error) { return { type: exporterConstants.EXP_CREATE_PO_FAILURE, error } }
}


function dispatchOrder(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        exporterService.dispatchOrder(formData)
            .then(order => { 
                dispatch(success(order))
                dispatch(alertActions.success('Fulfilled Order !'));
            })
            .then(()=>dispatch(getAllToDispatch()))
            .then(()=>dispatch(getAllDispatched()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
                getAllToDispatch();
            })
    };

    function request() { return { type: exporterConstants.EXP_CREATE_PO_REQUEST } }
    function success(order) { return { type: exporterConstants.EXP_CREATE_PO_SUCCESS, order } }
    function failure(error) { return { type: exporterConstants.EXP_CREATE_PO_FAILURE, error } }
}

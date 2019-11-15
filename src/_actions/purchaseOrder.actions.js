import { purchaseOrderConstants } from '../_constants';
import { purchaseOrderService } from '../_services';
import { alertActions } from './';

export const purchaseOrdeActions = {
    getAllPOList
}
function getAllPOList() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        purchaseOrderService.getAllPOList()
            .then(
                polist => { 
                    dispatch(success(polist.pos));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: purchaseOrderConstants.GET_PO_LIST_REQ} }
    function success(polist) { return { type: purchaseOrderConstants.GET_PO_LIST_SUCCESS, polist } }
    function failure(error) { return { type: purchaseOrderConstants.GET_PO_LIST_FAILURE, error } }
}
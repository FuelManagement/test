import { purchaseOrderConstants } from '../_constants';

export function purchaseOrder(state = {}, action) {
    switch (action.type) {
        case purchaseOrderConstants.GET_PO_LIST_REQ:
            return {
                ...state,
                loading: true
            };

        case purchaseOrderConstants.GET_PO_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                polist: action.polist
            };

        default:
            return {
                ...state
            };
    }
}
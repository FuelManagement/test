import { purchaseOrderConstants } from '../_constants';

export function purchaseOrder(state = {}, action) {
    switch (action.type) {
        case purchaseOrderConstants.GET_PO_LIST_REQ:
            return {
                ...state,
                loading: true
            };

        case productConstants.GET_PO_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                polist: action.pos
            };

        default:
            return {
                ...state
            };
    }
}
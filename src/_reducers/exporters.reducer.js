import { exporterConstants } from '../_constants';

export function exporters(state = {}, action) {
  switch (action.type) {
    case exporterConstants.EXP_GETALL_PO_REQUEST:
      return {
        ...state,
        loading: true
      };
      case exporterConstants.EXP_GETALL_PO_SUCCESS:
      return {
          ...state,
          loading: false,
          pendingOrders: action.orders,
      };
    
    case exporterConstants.EXP_GETALL_PO_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case exporterConstants.EXP_GETALL_SUPPLIER_PO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case exporterConstants.EXP_GETALL_SUPPLIER_PO_SUCCESS:
      return {
          ...state,
          loading: false,
          pendingSupplierOrders: action.orders,
      };
    
    case exporterConstants.EXP_GETALL_SUPPLIER_PO_FAILURE:
      return {
        ...state,
        error: action.error
      };
     
    case exporterConstants.EXP_CREATE_PO_REQUEST:
        return {
            ...state,
            loading: true
        };
    case exporterConstants.EXP_CREATE_PO_SUCCESS:
        return {
            ...state,
            loading: false,
            order: action.order
        };
    case exporterConstants.EXP_CREATE_PO_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    case exporterConstants.EXP_GETALL_TD_REQUEST:
        return {
            ...state,
            loading: true
        };
    case exporterConstants.EXP_GETALL_TD_SUCCESS:
        return {
            ...state,
            loading: false,
            pendingDispatch: action.orders
        };
    case exporterConstants.EXP_GETALL_TD_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    case exporterConstants.EXP_GETALL_DISPATCHED_REQUEST:
        return {
            ...state,
            loading: true
        };
    case exporterConstants.EXP_GETALL_DISPATCHED_SUCCESS:
        return {
            ...state,
            loading: false,
            dispatched: action.orders
        };
    case exporterConstants.EXP_GETALL_DISPATCHED_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    default:
      return state
  }
}

import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.orders
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.CREATE_PO_REQUEST:
      return {
        ...state,
          loading: true,
          resetForm: false
      };
    case userConstants.CREATE_PO_SUCCESS:
      return {
          ...state,
          loading: false,
          order: action.order,
          resetForm: true
      };
    case userConstants.CREATE_PO_FAILURE:
      return {
          ...state,
          loading: false,
          error: action.error,
          resetForm: false
      };
    default:
      return state
  }
}

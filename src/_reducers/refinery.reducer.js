import { refineryConstants } from '../_constants';

export function refinerys(state = {}, action) {
  switch (action.type) {
    case refineryConstants.REF_GETALL_PO_REQUEST:
      return {
        ...state,
        loading: true
      };
      case refineryConstants.REF_GETALL_PO_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingOrders: action.orders
      };
    case refineryConstants.REF_GETALL_PO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case refineryConstants.REF_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case refineryConstants.REF_DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.id)
      };
    case refineryConstants.REF_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      case refineryConstants.REF_CREATE_PO_REQUEST:
          return {
              ...state,
              loading: true
          };
      case refineryConstants.REF_CREATE_PO_SUCCESS:
          return {
              ...state,
              loading: false,
              order: action.order
          };
      case refineryConstants.REF_CREATE_PO_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };
      case refineryConstants.REF_GETALL_TD_REQUEST:
          return {
              ...state,
              loading: true
          };
      case refineryConstants.REF_GETALL_TD_SUCCESS:
          return {
              ...state,
              loading: false,
              pendingDispatch: action.orders
          };
      case refineryConstants.REF_GETALL_TD_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };
      case refineryConstants.REF_GETALL_DISPATCHED_REQUEST:
          return {
              ...state,
              loading: true
          };
      case refineryConstants.REF_GETALL_DISPATCHED_SUCCESS:
          return {
              ...state,
              loading: false,
              dispatchedOrders: action.orders
          };
      case refineryConstants.REF_GETALL_DISPATCHED_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };
      case refineryConstants.REF_DISPATCH_REQUEST:
          return {
              ...state,
              loading: true
          };
      case refineryConstants.REF_DISPATCH_SUCCESS:
          return {
              ...state,
              loading: false,
              dispatchedOrder: action.order
          };
      case refineryConstants.REF_DISPATCH_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };
    default:
      return state
  }
}

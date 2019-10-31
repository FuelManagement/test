import { rfqConstants } from '../_constants';

export function rfq(state = {}, action) {
  switch (action.type) {
    case rfqConstants.GETALL_REQUEST:
    case rfqConstants.GETALL_TO_USER_REQUEST:
    case rfqConstants.GETALL_PRODUCTS_REQUEST:
    case rfqConstants.GET_ALL_PARTICIPANT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case rfqConstants.GETALL_FAILURE:
    case rfqConstants.GETALL_TO_USER_FAILURE:
    case rfqConstants.GETALL_PRODUCTS_FAILURE:
    case rfqConstants.GET_ALL_PARTICIPANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case rfqConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        rfqs: action.rfqs
      };
    case rfqConstants.GETALL_SUCCESS:
        return {
          ...state,
          loading: false,
          rfqsToUsers: action.rfqs
        };
    case rfqConstants.GETALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products
      };
    case rfqConstants.GET_ALL_PARTICIPANT_SUCCESS:
        return {
          ...state,
          loading: false,
          participants: action.participants
        };
    default:
      return {
        ...state
      };
  }
}
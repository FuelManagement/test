import { ioConstants } from '../_constants';

export function io(state = {}, action) {
  switch (action.type) {
    case ioConstants.GETALL_REQUEST:
    case ioConstants.GETALL_PRODUCTS_REQUEST:
    case ioConstants.GET_ALL_PARTICIPANT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ioConstants.GETALL_FAILURE:
    case ioConstants.GETALL_PRODUCTS_FAILURE:
    case ioConstants.GET_ALL_PARTICIPANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ioConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        rfqs: action.rfqs
      };
    case ioConstants.GETALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products
      };
    case ioConstants.GET_ALL_PARTICIPANT_SUCCESS:
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
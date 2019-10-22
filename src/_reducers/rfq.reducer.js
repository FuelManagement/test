import { rfqConstants } from '../_constants';

export function rfq(state = {}, action) {
  switch (action.type) {
    case rfqConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case rfqConstants.GETALL_FAILURE:
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

    case rfqConstants.GETALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case rfqConstants.GETALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products
      };
    case rfqConstants.GETALL_PRODUCTS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error
    };
    default:
      return {
        ...state
      };
  }
}
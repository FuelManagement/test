import { productConstants } from '../_constants';

export function product(state = {}, action) {
  switch (action.type) {
    case productConstants.PRODUCT_GETALL_REQUEST:
    case productConstants.PRODUCT_GET_REQUEST:
    case productConstants.PRODUCT_CREATE_REQUEST:
    case productConstants.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case productConstants.PRODUCT_GETALL_FAILURE:
    case productConstants.PRODUCT_GET_FAILURE:
    case productConstants.PRODUCT_CREATE_FAILURE:
    case productConstants.PRODUCT_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case productConstants.PRODUCT_GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            products: action.products
              };
              case productConstants.PRODUCT_GET_SUCCESS:
        return {
            ...state,
            loading: false,
            product: action.product
              };
              case productConstants.PRODUCT_CREATE_SUCCESS:
              case productConstants.PRODUCT_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
              };
              case productConstants.PRODUCT_MODE:
                    case productConstants.PRODUCT_RESET:
        return {
            ...state,
            mode: action.collection.mode,
            product: action.collection.product
              };

                   
              case productConstants.PRODUCT_CHANGE:
                    return {
                        ...state,
                        product: {
                            ...state.product,
                            [action.collection.key]: 
                            action.collection.value
                          }
                          };
      default:
        return {
            ...state
        };
    }
}
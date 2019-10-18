import { adminConstants } from '../_constants';

export function admin(state = {}, action) {
  switch (action.type) {
    case adminConstants.GETALL_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case adminConstants.GETALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      };
    case adminConstants.GETALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case adminConstants.APPORVE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case adminConstants.APPORVE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.user
        };
    case adminConstants.APPORVE_USER_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.error
          };
    default:
      return state
  }
}

import { userRolesConstants } from '../_constants';

export function userRole(state = {}, action) {
  switch (action.type) {
     case userRolesConstants.USER_ROLES_GET_REQUEST:
    case userRolesConstants.USER_ROLES_CREATE_REQUEST:
    case userRolesConstants.USER_ROLES_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userRolesConstants.USER_ROLES_GET_FAILURE:
    case userRolesConstants.USER_ROLES_CREATE_FAILURE:
    case userRolesConstants.USER_ROLES_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
     
    case userRolesConstants.USER_ROLES_GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            userRoles: action.userRoles
              };
        case userRolesConstants.USER_ROLES_CREATE_SUCCESS:
          return{
            ...state,
            loading: false,
            userCreateRole: action
          }
        case userRolesConstants.USER_ROLES_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
            userUpdateRole: action
              };
              
      default:
        return {
            ...state
        };
    }
}
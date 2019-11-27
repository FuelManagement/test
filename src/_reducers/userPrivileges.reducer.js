import { userPrivilegesConstants } from '../_constants';

export function userRolePrivilege(state = {}, action) {
  switch (action.type) {
     case userPrivilegesConstants.USER_PRIVILEGES_GET_REQUEST:
    case userPrivilegesConstants.USER_PRIVILEGES_CREATE_REQUEST:
    case userPrivilegesConstants.USER_PRIVILEGES_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userPrivilegesConstants.USER_PRIVILEGES_GET_FAILURE:
    case userPrivilegesConstants.USER_PRIVILEGES_CREATE_FAILURE:
    case userPrivilegesConstants.USER_PRIVILEGES_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
     
    case userPrivilegesConstants.USER_PRIVILEGES_GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            userPrivilege: action.userPrivileges
              };
        case userPrivilegesConstants.USER_PRIVILEGES_CREATE_SUCCESS:
          return{
            ...state,
            loading: false,
            userCreatePrivilege: action
          }
        case userPrivilegesConstants.USER_PRIVILEGES_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
            userUpdatePrivilege: action
              };
              
      default:
        return {
            ...state
        };
    }
}
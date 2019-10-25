import { userProfileConstants } from '../_constants';

export function userProfile(state = {}, action) {
  switch (action.type) {
    case userProfileConstants.USER_PROFILE_GETALL_REQUEST:
    case userProfileConstants.USER_PROFILE_GET_REQUEST:
    case userProfileConstants.USER_PROFILE_CREATE_REQUEST:
    case userProfileConstants.USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userProfileConstants.USER_PROFILE_GETALL_FAILURE:
    case userProfileConstants.USER_PROFILE_GET_FAILURE:
    case userProfileConstants.USER_PROFILE_CREATE_FAILURE:
    case userProfileConstants.USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case userProfileConstants.USER_PROFILE_GETALL_SUCCESS:
        return {
            ...state,
            loading: false,
            userProfiles: action.userProfiles
              };
              case userProfileConstants.USER_PROFILE_GET_SUCCESS:
        return {
            ...state,
            loading: false,
            userProfile: action.userProfile
              };
              case userProfileConstants.USER_PROFILE_CREATE_SUCCESS:
              case userProfileConstants.USER_PROFILE_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
              };
              case userProfileConstants.USER_PROFILE_MODE:
                    case userProfileConstants.USER_PROFILE_RESET:
        return {
            ...state,
            mode: action.collection.mode,
            userProfile: action.collection.userProfile
              };

                   
                          case userProfileConstants.USER_PROFILE_CHANGE:
                                return {
                                    ...state,
                                    userProfile: {
                                        ...state.userProfile,
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
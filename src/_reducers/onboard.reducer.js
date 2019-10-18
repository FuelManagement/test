import { onboardConstants } from '../_constants';

export function onboard(state = {}, action) {
  switch (action.type) {
    case onboardConstants.ONBRD_GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
      case onboardConstants.ONBRD_GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        participants:action.onboarders
      };
      case onboardConstants.ONBRD_GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case onboardConstants.ONBRD_CREATE_ONBOARD_REQUEST:
      return {
        ...state,
        loading: true
      };
      case onboardConstants.ONBRD_CREATE_ONBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        participant:action.onboarder
      };
      case onboardConstants.ONBRD_CREATE_ONBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case onboardConstants.ONBRD_UPLOAD_PARTICIPANT_FILE_REQUEST:
        return {
          ...state,
          loading: true,
          documentslist: []
        };
        case onboardConstants.ONBRD_UPLOAD_PARTICIPANT_FILE_SUCCESS:
          return {
            ...state,
            loading: false,
            documentslist: action.files
          };
          case onboardConstants.ONBRD_UPLOAD_PARTICIPANT_FILE_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.error
            };
            case onboardConstants.ONBRD_MODE_PARTICIPANT:
              return {
                ...state,
                mode: action.collection.mode,
                participant: action.collection.participant
              };
              case onboardConstants.ONBRD_RESET_PARTICIPANT:
              return {
                ...state,
                mode: action.collection.mode,
                participant: action.collection.participant
              };
              case onboardConstants.ONBRD_CHANGE_PARTICIPANT:
              return {
                ...state,
                participant: {
                  ...state.participant,
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
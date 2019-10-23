import { onboardConstants } from '../_constants';

export function onboard(state = {}, action) {
  switch (action.type) {
    case onboardConstants.ONBRD_GET_ALL_PARTICIPANT_REQUEST:
    case onboardConstants.ONBRD_GET_PARTICIPANT_REQUEST:
        case onboardConstants.ONBRD_CREATE_PARTICIPANT_REQUEST:
            case onboardConstants.ONBRD_UPDATE_PARTICIPANT_REQUEST:
                case onboardConstants.ONBRD_GETALL_REQUEST:
                    case onboardConstants.ONBRD_CREATE_ONBOARD_REQUEST:
      return {
        ...state,
        loading: true
      };
      case onboardConstants.ONBRD_CREATE_ONBOARD_FAILURE:
      case onboardConstants.ONBRD_GET_PARTICIPANT_FAILURE:
          case onboardConstants.ONBRD_GET_ALL_PARTICIPANT_FAILURE:
              case onboardConstants.ONBRD_UPDATE_PARTICIPANT_FAILURE:
                  case onboardConstants.ONBRD_GETALL_FAILURE:
                      case onboardConstants.ONBRD_CREATE_ONBOARD_FAILURE:
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
 
                case onboardConstants.ONBRD_CREATE_PARTICIPANT_SUCCESS:
                case onboardConstants.ONBRD_UPDATE_PARTICIPANT_SUCCESS:
                    case onboardConstants.ONBRD_GET_PARTICIPANT_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  participant:action.participant
                };
                case onboardConstants.ONBRD_GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        participants:action.onboarders
      };
      case onboardConstants.ONBRD_CREATE_ONBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        participant:action.onboarder
      };
                case onboardConstants.ONBRD_GET_ALL_PARTICIPANT_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      participants:action.participants
                    };
                    case onboardConstants.ONBRD_UPLOAD_PARTICIPANT_FILE_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        documentslist: action.files
                      };      
    
      default:
          return {
              ...state
          };
    }
}
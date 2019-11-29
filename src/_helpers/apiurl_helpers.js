import {config} from './config';
export const APIURL = {
    
   GET_ALL_USER_PRIVILEGES:config.apiUrl+'/roles/getPrivilgesByParticipantId',
  
   CREATE_USER_PRIVILEGES:config.apiUrl+'/roles/createUserPrivilges',
   
   UPDATE_USER_PRIVILEGES:config.apiUrl+'/roles/updateUserPrivilges',
   

  };
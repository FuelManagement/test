import { onboardConstants } from '../_constants';
import { onboardService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { create } from 'filepond';

export const onboardActions = {
    getAllOnBoarder,
    createOnBoarder,
    createParticipant,
    getParticipant,
    getAllParticipant,
    updateParticipant,
    changeParticipant,
    resetParticipant,
    changeModeParticipant,

}
function getAllOnBoarder() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        onboardService.getAllOnBoarder()
            .then(
                onboarders => { 
                   
                    dispatch(success(onboarders));
                   
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: onboardConstants.ONBRD_GETALL_REQUEST } }
    function success(onboarders) { return { type: onboardConstants.ONBRD_GETALL_SUCCESS, onboarders } }
    function failure(error) { return { type: onboardConstants.ONBRD_GETALL_FAILURE, error } }
}
function createOnBoarder(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        onboardService.createOnBoarder(formData)
            .then( onboarder => { 
                dispatch(success(onboarder));
                dispatch(alertActions.success('Participant Created !'));
            })
            .then(()=>dispatch(getAllOnBoarder()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: onboardConstants.ONBRD_CREATE_ONBOARD_REQUEST } }
    function success(onboarder) { return { type: onboardConstants.ONBRD_CREATE_ONBOARD_SUCCESS, onboarder } }
    function failure(error) { return { type: onboardConstants.ONBRD_CREATE_ONBOARD_FAILURE, error } }
}
function createParticipant(collection,Documentslist)
{
    
    return dispatch => {
        dispatch(request());
        onboardService.createParticipant(collection,Documentslist)
            .then((collection)=>
            {
                dispatch(success({}));
                dispatch(alertActions.success(`Participant Added Successfully !`));
            history.push('/');
        })
            .catch(error => {
                dispatch(failure(error))
                dispatch(alertActions.error(`Failed to add participant!`));
            });
    };

    function request() { return { type: onboardConstants.ONBRD_CREATE_PARTICIPANT_REQUEST} }
    function success(participant) { return { type: onboardConstants.ONBRD_CREATE_PARTICIPANT_SUCCESS, participant } }
    function failure(error) { return { type: onboardConstants.ONBRD_CREATE_PARTICIPANT_FAILURE, error } }
}
function getParticipant(collection)
{
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        onboardService.getParticipant(collection)
            .then(
                participant => { 
                   
                    dispatch(success(participant));
                   
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: onboardConstants.ONBRD_GET_PARTICIPANT_REQUEST } }
    function success(participant) { return { type: onboardConstants.ONBRD_GET_ALL_PARTICIPANT_SUCCESS, participant } }
    function failure(error) { return { type: onboardConstants.ONBRD_GET_PARTICIPANT_FAILURE, error } }

}
function updateParticipant(collection)
{
    return dispatch => {
        dispatch(request());
        onboardService.updateParticipant(collection,Documentslist)
            .then((collection)=>
            {
                dispatch(success({}));
                dispatch(alertActions.success(`Participant Added Successfully !`));
            history.push('/');
        })
            .catch(error => {
                dispatch(failure(error))
                dispatch(alertActions.error(`Failed to add participant!`));
            });
    };

    function request() { return { type: onboardConstants.ONBRD_UPDATE_PARTICIPANT_REQUEST} }
    function success(participant) { return { type: onboardConstants.ONBRD_UPDATE_PARTICIPANT_SUCCESS, participant } }
    function failure(error) { return { type: onboardConstants.ONBRD_UPDATE_PARTICIPANT_FAILURE, error } }

}
function changeParticipant(key,value)
{
    return dispatch => {
       
        let collection={
            key:key,
            value:value
        }
        dispatch(success(collection));
    
};
function success(collection) { return { type: onboardConstants.ONBRD_CHANGE_PARTICIPANT, collection } }

}
function resetParticipant()
{
    return dispatch => {
       
            let collection={
                mode:'create',
                participant:{}
            }
            dispatch(success(collection));
        
    };
    function success(collection) { return { type: onboardConstants.ONBRD_RESET_PARTICIPANT, collection } }
   
}
function changeModeParticipant(mode){
    return dispatch => {
        if(mode==='create'){
            let collection={
                mode:'create',
                participant:{}
            }
            dispatch(success(collection));
        }
        
       
    };
    function success(collection) { return { type: onboardConstants.ONBRD_MODE_PARTICIPANT, collection } }
   
}

function getAllParticipant(){
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        onboardService.getAllParticipant()
            .then(
                participant => { 
                   
                    dispatch(success(participant));
                   
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: onboardConstants.ONBRD_GET_ALL_PARTICIPANT_REQUEST } }
    function success(participants) { return { type: onboardConstants.ONBRD_GET_ALL_PARTICIPANT_SUCCESS, participants } }
    function failure(error) { return { type: onboardConstants.ONBRD_GET_ALL_PARTICIPANT_FAILURE, error } }

}
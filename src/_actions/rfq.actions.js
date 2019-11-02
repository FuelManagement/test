import { rfqConstants } from '../_constants';
import { rfqService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const rfqActions = {
    getAllRfq,
    getAllRfqToUSer,
    postNewRfq,
    getAllProducts,
    getAllParticipant,
    updateRfq
};

function getAllRfq() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        rfqService.getAllRfq()
            .then(
                rfqs => { 
                    dispatch(success(rfqs))
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error("Error loading list. Try Again."));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: rfqConstants.GETALL_REQUEST } }
    function success(rfqs) { return { type: rfqConstants.GETALL_SUCCESS, rfqs } }
    function failure(error) { return { type: rfqConstants.GETALL_FAILURE, error } }
}

function getAllRfqToUSer() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        rfqService.getAllRfqToUser()
            .then(
                rfqs => {
                    dispatch(success(rfqs))
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error("Error loading list. Try Again."));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: rfqConstants.GETALL_TO_USER_REQUEST } }
    function success(rfqs) { return { type: rfqConstants.GETALL_TO_USER_SUCCESS, rfqs } }
    function failure(error) { return { type: rfqConstants.GETALL_TO_USER_FAILURE, error } }
}

function postNewRfq(formData) {
    console.log('1. I am in Create')
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        rfqService.postNewRfq(formData)
            .then(
                rfqs => {
                    dispatch(success(rfqs))
                    dispatch(alertActions.success('RFQ Created Successfully'));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Error Creating RFQ."));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: rfqConstants.GETALL_REQUEST } }
    function success(rfqs) { return { type: rfqConstants.GETALL_SUCCESS, rfqs } }
    function failure(error) { return { type: rfqConstants.GETALL_FAILURE, error } }
}

function updateRfq(formData) {
    console.log('2. I am in update')
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        rfqService.updateRfq(formData)
            .then(
                rfqs => {
                    dispatch(success(rfqs))
                    dispatch(alertActions.success('RFQ Created Successfully'));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Error Creating RFQ."));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: rfqConstants.UPDATE_RFQ_REQUEST } }
    function success(rfqs) { return { type: rfqConstants.UPDATE_RFQ_SUCCESS, rfqs } }
    function failure(error) { return { type: rfqConstants.UPDATE_RFQ_FAILURE, error } }
}

function getAllProducts() {
    return dispatch => {
        dispatch(request());
        rfqService.getAllProducts()
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
    }

    function request() { return { type: rfqConstants.GETALL_PRODUCTS_REQUEST } }
    function success(products) { return { type: rfqConstants.GETALL_PRODUCTS_SUCCESS, products } }
    function failure(error) { return { type: rfqConstants.GETALL_PRODUCTS_FAILURE, error } }
}

function getAllParticipant(){
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        rfqService.getAllParticipant()
            .then(
                participant => { 
                    dispatch(success(participant.filter(f=>f.Documentslist!==undefined && f.Documentslist.length>0)));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: rfqConstants.GET_ALL_PARTICIPANT_REQUEST } }
    function success(participants) { return { type: rfqConstants.GET_ALL_PARTICIPANT_SUCCESS, participants } }
    function failure(error) { return { type: rfqConstants.GET_ALL_PARTICIPANT_FAILURE, error } }
}
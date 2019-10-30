import { ioConstants } from '../_constants';
import { ioService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const ioActions = {
    getAllIO,
    postNewIO,
    getAllProducts,
    getAllParticipant,
};

function getAllIO() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        ioService.getAllIO()
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

    function request() { return { type: ioConstants.GETALL_REQUEST } }
    function success(rfqs) { return { type: ioConstants.GETALL_SUCCESS, rfqs } }
    function failure(error) { return { type: ioConstants.GETALL_FAILURE, error } }
}

function postNewIO(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        ioService.postNewIO(formData)
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

    function request() { return { type: ioConstants.GETALL_REQUEST } }
    function success(rfqs) { return { type: ioConstants.GETALL_SUCCESS, rfqs } }
    function failure(error) { return { type: ioConstants.GETALL_FAILURE, error } }
}

function getAllProducts() {
    return dispatch => {
        dispatch(request());
        ioService.getAllProducts()
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
    }

    function request() { return { type: ioConstants.GETALL_PRODUCTS_REQUEST } }
    function success(products) { return { type: ioConstants.GETALL_PRODUCTS_SUCCESS, products } }
    function failure(error) { return { type: ioConstants.GETALL_PRODUCTS_FAILURE, error } }
}

function getAllParticipant(){
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        ioService.getAllParticipant()
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

    function request() { return { type: ioConstants.GET_ALL_PARTICIPANT_REQUEST } }
    function success(participants) { return { type: ioConstants.GET_ALL_PARTICIPANT_SUCCESS, participants } }
    function failure(error) { return { type: ioConstants.GET_ALL_PARTICIPANT_FAILURE, error } }
}
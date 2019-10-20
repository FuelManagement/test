import { rfqConstants } from '../_constants';
import { rfqService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const rfqActions = {
    getAllRfq,
};

function getAllRfq() {
    return dispatch => {
        dispatch(request());
        rfqService.getAllRfq()
            .then(
                rfqs => dispatch(success(rfqs)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: rfqConstants.GETALL_REQUEST } }
    function success(rfqs) { return { type: rfqConstants.GETALL_SUCCESS, rfqs } }
    function failure(error) { return { type: rfqConstants.GETALL_FAILURE, error } }
}
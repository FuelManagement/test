import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    loading,
    clearLoading
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

function loading() {
    return { type: alertConstants.LOADING };
}

function clearLoading() {
    return { type: alertConstants.CLEAR_LOADING };
}
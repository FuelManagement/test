import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
export const productActions = {
    getAllProduct,
    createProduct,
    getProduct,
    updateProduct,
    changeProduct,
    resetProduct,
    changeModeProduct
}
function getAllProduct() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        productService.getAllProduct()
            .then(
                products => { 
                    dispatch(success(products.products));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: productConstants.PRODUCT_GETALL_REQUEST } }
    function success(products) { return { type: productConstants.PRODUCT_GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.PRODUCT_GETALL_FAILURE, error } }
}
function createProduct(collection) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        productService.createProduct(collection)
            .then( product => { 
                dispatch(success(product));
                dispatch(alertActions.success('Product Added Successfully !'));
            })
            .then(()=>dispatch(getAllProduct()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: productConstants.PRODUCT_CREATE_REQUEST } }
    function success(product) { return { type: productConstants.PRODUCT_CREATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_CREATE_FAILURE, error } }
}
function getProduct(collection)
{
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        dispatch(success(collection));
        dispatch(alertActions.clearLoading());
        // productService.getProduct(collection)
        //     .then(
        //         product => { 
        //             dispatch(success(product));
        //             dispatch(alertActions.clearLoading());
        //         },
        //         error => {
        //             dispatch(failure(error))
        //             dispatch(alertActions.clearLoading());
        //         }
        //     );
    };

    function request() { return { type: productConstants.PRODUCT_GET_REQUEST } }
    function success(product) { return { type: productConstants.PRODUCT_GET_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_GET_FAILURE, error } }

}
function updateProduct(collection)
{
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        productService.updateProduct(collection)
            .then( product => { 
                dispatch(success(product));
                dispatch(alertActions.success('Product Updated Successfully !'));
            })
            .then(()=>dispatch(getAllProduct()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: productConstants.PRODUCT_UPDATE_REQUEST } }
    function success(product) { return { type: productConstants.PRODUCT_UPDATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_UPDATE_FAILURE, error } }

}
function changeProduct(key,value)
{
    return dispatch => {
       
        let collection={
            key:key,
            value:value
        }
        dispatch(success(collection));
    
};
function success(collection) { return { type: productConstants.PRODUCT_CHANGE, collection } }

}
function resetProduct()
{
    return dispatch => {
       
            let collection={
                mode:'create',
                product:{}
            }
            dispatch(success(collection));
        
    };
    function success(collection) { return { type: productConstants.PRODUCT_RESET, collection } }
   
}
function changeModeProduct(mode){
    return dispatch => {

            let collection={
                mode:mode,
                product:{}
            }
            dispatch(success(collection));
       
       
    };
    function success(collection) { return { type: productConstants.PRODUCT_MODE, collection } }
   
}

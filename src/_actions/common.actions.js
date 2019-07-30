import { commonService } from "../_services/common.service";
import { appConstants } from "../_constants";
import { appHelpers } from "../_helpers";

export const commonActions = {
    fetchMovies
}

function fetchMovies() {
    return dispatch => {
        return commonService.fetchAllMovies()
            .then(
                response => {
                    if(response.status === appConstants.SUCCESS_RESPONSE) {

                        console.log({response})
                        dispatch(success(response));
                    }
                    else if(response.status === appConstants.ERROR_RESPONSE){
                        dispatch(failure(response.response));
                    }
                },
                error => {
                    let errorMessage = appHelpers.interpretErrorResponse(error);
                    dispatch(failure(errorMessage));
                }
            );
    };

    function success(entities) { return { type: commonConstants.GET_ENTITIES, entities } }
    function failure(message) { return { type: alertConstants.ERROR, message } }

}
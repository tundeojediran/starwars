import { commonService } from "../_services/common.service";
import { appConstants, alertConstants, commonConstants } from "../_constants";
import { appHelpers } from "../_helpers";

export const commonActions = {
    fetchMovies
}

function fetchMovies() {
    return dispatch => {
        return commonService.fetchAllMovies()
            .then(
                response => {
                    if (response.status === appConstants.SUCCESS_RESPONSE) {
                        // console.log(response["response"].results)

                        let moviesTitles = appHelpers.getMoviesTitles(response.response.results);
                        console.log({ moviesTitles })
                        dispatch(success(moviesTitles));
                    }
                    else if (response.status === appConstants.ERROR_RESPONSE) {
                        dispatch(failure(response.response));
                    }
                },
                error => {
                    let errorMessage = appHelpers.interpretErrorResponse(error);
                    dispatch(failure(errorMessage));
                }
            );
    };

    function success(movieTitles) {
        // console.log({ movieTitles })
        return { type: commonConstants.TITLES, movieTitles }
    }
    function failure(message) { return { type: alertConstants.ERROR, message } }

}
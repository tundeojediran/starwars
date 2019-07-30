import { appConstants } from "../_constants/app.constants";
import { appHelpers } from "../_helpers";

export const commonService = {
    fetchAllMovies,
    fetchMovieDetails
}

// fetch all starwars movies
function fetchAllMovies() {
    return appHelpers.getRequest(`${appConstants.BASE_URL}/api/films`)
        .then(res => {
            return appHelpers.formatPromiseResponse(res.data);
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}

// fetch the details of a starwars movie
function fetchMovieDetails() {
    return appHelpers.getRequest(`${appConstants.BASE_URL}/api/films`)
        .then(res => {
            return appHelpers.formatPromiseResponse(res.data);
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}
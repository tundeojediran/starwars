import axios from "axios";
import { appConstants } from "../_constants";

export const appHelpers = {
    // helper function for get request
    getRequest: function (url, header) {
        let reqHeader = header
            ? header
            : { "Content-Type": "application/json" };
        let config = { headers: reqHeader };
        return axios.get(url, config)
    },
    // helper function for formatting response
    formatPromiseResponse: function (res, resType) {
        let responseType =
            resType === undefined ? appConstants.SUCCESS_RESPONSE : resType;
        return { status: responseType, response: res };
    },
    // helper function for formatting error response
    interpretErrorResponse(error) {
        let errorMessage = "";
        if (error.response) {
            errorMessage = error.response.data
                ? error.response.data
                : "Unable to handle request";
        } else if (error.request) {
            errorMessage = "Currently, unable to handle request!"
        } else {
            errorMessage = "Something went wrong!"
        }

        if (typeof errorMessage === "string") {
            return errorMessage;
        }
        else if (Array.isArray(errorMessage)) {
            return errorMessage.join(',');
        } else {
            return "Something went wrong!";
        }
    },

    // helper function for fetching an array of movies titles
    getMoviesTitles: function (movies) {
        console.log({movies})
        
        let moviesTitles = movies.map((movie) => {
            return {
                "label": movie.title,
                "value": movie.url
            }
        })
        return moviesTitles;
    }
}
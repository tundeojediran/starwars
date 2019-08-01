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
    getMultipleRequest: function (urls) {

        Promise.all(urls.map(url =>
            fetch(url)
                .then(this.checkStatus)
                .then(this.parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ));
        // .then(data => {
        //     console.log({data})
        //     // const breedList = data[0].message;
        //     // const randomImage = data[1].message;

        //     // generateOptions(breedList);
        //     // generateImage(randomImage);
        // })

    },

    checkStatus: function (response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    },

    parseJSON: function (response) {
        return response.json();
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
        let moviesTitles = movies.map((movie) => {
            return {
                "label": movie.title,
                "value": movie.url
            }
        })
        return moviesTitles;
    },

    calculateTotalHeight: function (data) {

        let initialValue = 0;
        let sumHeights = data.reduce(function (accumulator, currentValue) {
            let derivedValue = (isNaN(currentValue.height)) ? 0 : Number(currentValue.height);
            return accumulator + derivedValue;
        }, initialValue);

        let sumHeightsInFeet = this.convertInchesToFeetInches(sumHeights * 0.39370)

        return {
            sumHeights,
            sumHeightsInFeet
        }
    },

    convertInchesToFeetInches: function (inches) {
        let feetFromInches = Math.floor(inches / 12);
        let inchesRemainder = inches % 12;

        let result = `${feetFromInches}ft/${inchesRemainder}in`;
        return result;
    },

    filterGenderList: function (data) {
        let genderList = [...new Set(data.map(item => item.gender))];
        return genderList;
    }
}
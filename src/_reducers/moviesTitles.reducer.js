import { commonConstants } from '../_constants';
import { initialState } from '../_helpers';

export function moviesTitles(state = initialState.moviesTitles, action) {
    console.log({action})
    switch (action.type) {
        case commonConstants.TITLES:
            return action.movieTitles;
        default:
            return state
    }
}
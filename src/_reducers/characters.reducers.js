// import { commonConstants } from '../_constants';
import { initialState } from '../_helpers';

export function characters(state = initialState.characters, action) {
    switch (action.type) {
        case "CHARACTERS":
            return action.characters;
        default:
            return state
    }
}
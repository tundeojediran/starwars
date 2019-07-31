import { combineReducers } from 'redux';
import { moviesTitles } from './moviesTitles.reducer'

const rootReducer = combineReducers({
    moviesTitles
})

export default rootReducer;
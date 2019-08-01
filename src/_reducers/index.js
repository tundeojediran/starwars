import { combineReducers } from 'redux';
import { moviesTitles } from './moviesTitles.reducer'
import { characters } from './characters.reducers'
const rootReducer = combineReducers({
    moviesTitles,
    characters
})

export default rootReducer;
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import activityMiddleware from "../_middlewares/activity";

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware, activityMiddleware];
if(process.env.NODE_ENV === 'development')
    middleware = [...middleware, loggerMiddleware];

export const store = createStore(
    rootReducer,
    applyMiddleware(
        ...middleware
    )
);

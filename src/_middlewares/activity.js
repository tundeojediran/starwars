import { alertConstants, appConstants } from "../_constants";
import { addLog } from "../_actions/activity.actions";

const activityMiddleware = ({ getState, dispatch }) => (next) => (action) => {
    if ((action.type !== appConstants.ADD_LOG) && 
    (action.type !== alertConstants.CLEAR) && 
    (action.type !== alertConstants.ERROR) && 
    (action.type !== alertConstants.SUCCESS)) {
        dispatch(addLog(action.type));
    } else {
        next(action);
    }
};

export default activityMiddleware;
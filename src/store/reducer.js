import { combineReducers } from "redux";
import { reducer as headerReducer } from '../common/hander/store'

const reducer = combineReducers({
    header: headerReducer
});

export default reducer

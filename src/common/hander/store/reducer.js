import * as actionTypes from './constants'
import { fromJS } from "immutable";

const defaultStatus = fromJS({
    focused: false
});

export default ( state = defaultStatus, action ) => {

    if (action.type === actionTypes.SEARCH_FOCUS) {
        return state.set('focused', true)
    }

    if(action.type === actionTypes.SEARCH_BLUR) {
        return state.set('focused', false)
    }

    return state;
}

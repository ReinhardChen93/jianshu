import * as actionTypes from './constants'
import { fromJS } from "immutable";

const defaultStatus = fromJS({
    focused: false,
    list: []
});

export default ( state = defaultStatus, action ) => {

    if (action.type === actionTypes.SEARCH_FOCUS) {
        return state.set('focused', true)
    }

    if(action.type === actionTypes.SEARCH_BLUR) {
        return state.set('focused', false)
    }

    if(action.type === actionTypes.CHANGE_LIST) {
        return state.set('list', action.data)
    }

    return state;
}

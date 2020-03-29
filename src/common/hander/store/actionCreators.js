import * as actionTypes from './constants'

class actionCreators {
    static searchFocus = () => ({
        type: actionTypes.SEARCH_FOCUS
    });

    static searchBlur = () => ({
        type: actionTypes.SEARCH_BLUR
    });
}
export default actionCreators

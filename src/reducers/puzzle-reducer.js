import {
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE
} from '../actions'
import { defaultState } from '../utils';

const puzzleReducer = (state = defaultState(), action) => {

    switch (action.type) {
        case MOVE_RIGHT:
            return state
        case MOVE_LEFT:
            return state
        case MOVE_DOWN:
            return state
        case ROTATE:
            return state
        default:
            return state
    }
};

export default puzzleReducer
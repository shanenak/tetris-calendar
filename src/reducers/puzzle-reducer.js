import {
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE
} from '../actions'

const puzzleReducer = (state = {}, action) => {

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
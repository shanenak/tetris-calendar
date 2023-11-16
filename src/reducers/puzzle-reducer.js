import {
    RECEIVE_GRID
} from '../actions'
import { defaultState } from '../utils';

const puzzleReducer = (state = defaultState(), action) => {
    const nextState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECEIVE_GRID:
            nextState.grid = action.grid
            return nextState
        default:
            return state
    }
};

export default puzzleReducer
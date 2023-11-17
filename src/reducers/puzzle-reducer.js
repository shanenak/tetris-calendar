import {
    RECEIVE_GRID, RECEIVE_SCORE, RECEIVE_SOLUTIONS, receiveScore, receiveSolutions
} from '../actions'
import { attemptSolves } from '../components/Puzzle';
import { defaultState } from '../utils';

export const getSolutions = (grid) => async (dispatch) => {
    const solutions = await attemptSolves(grid);
    const numPiecesPlaced = Object.keys(solutions);
    const solutionList = Object.values(solutions)[0];
    if (solutionList?.length>0) {
        dispatch(receiveSolutions(solutionList));
        dispatch(receiveScore(numPiecesPlaced));
    }
};

const puzzleReducer = (state = defaultState(), action) => {
    const nextState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECEIVE_GRID:
            nextState.grid = action.grid;
            return nextState
        case RECEIVE_SOLUTIONS:
            nextState.solutions = action.solutions;
            return nextState
        case RECEIVE_SCORE:
            nextState.score = action.score;
            return nextState
        default:
            return state
    }
};

export default puzzleReducer
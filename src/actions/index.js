// actions
export const RECEIVE_GRID = 'RECEIVE_GRID';
export const RECEIVE_SOLUTIONS = 'RECEIVE_SOLUTIONS';
export const RECEIVE_SCORE = 'RECEIVE_SCORE';

//action creators
export const receiveGrid = (grid) => {
    return {
        type: RECEIVE_GRID, 
        grid
    }
}

export const receiveSolutions = (solutions) => {
    return {
        type: RECEIVE_SOLUTIONS,
        solutions
    }
}

export const receiveScore = (score) => {
    return {
        type: RECEIVE_SCORE,
        score
    }
}


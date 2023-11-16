// actions
export const RECEIVE_GRID = 'RECEIVE_GRID';

//action creators
export const receiveGrid = (grid) => {
    return {
        type: RECEIVE_GRID, 
        grid
    }
}

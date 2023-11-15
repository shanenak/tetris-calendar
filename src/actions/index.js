// actions
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const ROTATE = 'ROTATE'


//action creators
export const moveRight = () => {
    return {
        type: MOVE_RIGHT
    }
}

export const moveLeft = () => {
    return {
        type: MOVE_LEFT
    }
}

export const moveDown = () => {
    return {
        type: MOVE_DOWN
    }
}

export const rotate = () => {
    return {
        type: ROTATE
    }
}
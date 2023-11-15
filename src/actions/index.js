const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_DOWN = 'MOVE_DOWN';
const ROTATE = 'ROTATE'

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
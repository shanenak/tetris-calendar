import CalendarSquare from "../components/CalendarSquare";

export const defaultState = () => {
    return {
        grid: defaultGrid(),
        shapeId: 0,
        x: 0,
        y: 0,
    }
}

export const gridToCalendar = (grid) => {
    const calendarTiles = [...Array(7)].map(e => Array(7));
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            calendarTiles[row][col] = <CalendarSquare color={grid[row][col].toString()} label={tiles[(row * 7) + col]} key={`row${row}-col${col}`} />
        }
    }
    return calendarTiles
}

export const defaultGrid = () => {
    const grid = [...Array(7)].map(e => Array(7).fill(0));
    // remove empty calendar squares from grid
    grid[0][6] = 10;
    grid[1][6] = 10;
    grid[6][3] = 10;
    grid[6][4] = 10;
    grid[6][5] = 10;
    grid[6][6] = 10;
    return grid
}

export const deepCopy = (grid) => {
    const deepCopy = [...Array(7)].map(e => Array(7).fill(0));
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            deepCopy[row][col] = grid[row][col]
        }
    }
    return deepCopy
}

export function blockDates(month, date) {
    const grid = defaultGrid();

    const monthRow = Math.floor(tiles.indexOf(month) / 7);
    const monthCol = tiles.indexOf(month) % 7;
    const dateRow = Math.floor(tiles.indexOf(date) / 7);
    const dateCol = tiles.indexOf(date) % 7;

    grid[monthRow][monthCol] = 9
    grid[dateRow][dateCol] = 9
    return grid
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', '', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];
export const days = [...Array(31).keys()].map(ele => ele + 1);
export const tiles = months.concat(days);

export const gridSize = 7;

export const pieces = [
    [
        [1, 0],
        [1, 1],
        [1, 1]
    ],
    [
        [2, 2],
        [2, 2],
        [2, 2]
    ],
    [
        [0, 0, 3, 3],
        [3, 3, 3, 0],
    ],
    [
        [4, 4, 4],
        [0, 0, 4],
        [0, 0, 4]
    ],
    [
        [5, 0],
        [5, 0],
        [5, 0],
        [5, 5]
    ],
    [
        [6, 0, 6],
        [6, 6, 6]
    ],
    [
        [7, 7, 0],
        [0, 7, 0],
        [0, 7, 7]
    ],
    [
        [0, 8],
        [8, 8],
        [0, 8],
        [0, 8]
    ]
]
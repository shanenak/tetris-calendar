import CalendarSquare from "../components/CalendarSquare";

export const defaultState = () => {
    return {
        grid: getDefaultGrid(),
        solutions: [],
        score: 0
    }
}

// convert grid values to calendar tile component
export const makeCalendar = (grid) => {
    const calendarTiles = [...Array(7)].map(e => Array(7));
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            calendarTiles[row][col] = <CalendarSquare color={grid[row][col].toString()} label={TILES[(row * 7) + col]} key={`row${row}-col${col}`} />
        }
    }
    return calendarTiles
}

// create default grid
export const getDefaultGrid = () => {
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

// create deep copy of nested arrays
export const getDeepCopy = (grid) => {
    const deepCopy = [...Array(7)].map(e => Array(7).fill(0));
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            deepCopy[row][col] = grid[row][col]
        }
    }
    return deepCopy
}

// update values for selected date so no piece can be placed there
export function blockDates(month, date) {
    const grid = getDefaultGrid();

    const monthRow = Math.floor(TILES.indexOf(month) / 7);
    const monthCol = TILES.indexOf(month) % 7;
    const dateRow = Math.floor(TILES.indexOf(date) / 7);
    const dateCol = TILES.indexOf(date) % 7;

    grid[monthRow][monthCol] = 9;
    grid[dateRow][dateCol] = 9;
    return grid
}

//// TODO: when rotating, additional rows and columns are added to make shapes square. remove extra or fix code to accommodate placement 
// export function getRotatedPieces(piece) {
//     let currRotation = piece;
//     const rotatedPieces = [currRotation];
//     for (let i = 0; i < 3; i++) {
//         currRotation = rotate(currRotation);
//         rotatedPieces.push(currRotation)
//     }
//     const uniqueRotatedPieces = rotatedPieces.slice(0, 2);
//     if (!checkNestedArrayEquality(rotatedPieces[0], rotatedPieces[2])) {
//         uniqueRotatedPieces.push(rotatedPieces[2])
//     } 
//     if (!checkNestedArrayEquality(rotatedPieces[1], rotatedPieces[3])) {
//         uniqueRotatedPieces.push(rotatedPieces[3])
//     }
//     return uniqueRotatedPieces
// }

// function rotate(piece) {
//     const numRows = piece.length;
//     const numCols = piece[0].length
//     const rotated = [...Array(numCols)].map(e => Array(numRows).fill(0));
//     for (let row=0; row<numRows; row++) {
//         for (let col=0; col<numCols; col++) {
//             rotated[col][numCols-row] = piece[row][col]
//         }
//     }
//     return rotated
// }

// function checkNestedArrayEquality(a, b) {
//     for (let row=0; row<a.length; row++) {
//         for (let col=0; col<a[0].length; col++) {
//             if (a[row][col]!==b[row][col]) {
//                 return false
//             }
//         }
//     }
//     return true
// }

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', '', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];
export const DAYS = [...Array(31).keys()].map(ele => ele + 1);
export const TILES = MONTHS.concat(DAYS);

export const GRID_SIZE = 7;

export const PIECES = [
    [
        [
            [1, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1],
            [1, 1],
            [0, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 1]
        ]
    ],
    [
        [
            [2, 2],
            [2, 2],
            [2, 2]
        ],
        [
            [2, 2, 2],
            [2, 2, 2]
        ]
    ],
    [
        [
            [0, 0, 3, 3],
            [3, 3, 3, 0]
        ],
        [
            [3, 0],
            [3, 0],
            [3, 3],
            [0, 3]
        ], 
        [
            [0, 3, 3, 3],
            [3, 3, 0, 0]
        ],
        [
            [3, 0],
            [3, 3],
            [0, 3],
            [0, 3]
        ]
    ],
    [
        [
            [4, 4, 4],
            [0, 0, 4],
            [0, 0, 4]
        ],
        [
            [0, 0, 4],
            [0, 0, 4],
            [4, 4, 4]
        ],
        [
            [4, 0, 0],
            [4, 0, 0],
            [4, 4, 4]
        ],
        [
            [4, 4, 4],
            [4, 0, 0],
            [4, 0, 0]
        ]
    ],
    [
        [
            [5, 5, 5, 5],
            [5, 0, 0, 0]
        ],
        [
            [5, 5],
            [0, 5],
            [0, 5],
            [0, 5]
        ],
        [
            [0, 0, 0, 5],
            [5, 5, 5, 5]
        ],
        [
            [5, 0],
            [5, 0],
            [5, 0],
            [5, 5]
        ]
    ],
    [
        [
            [6, 0, 6],
            [6, 6, 6]
        ],
        [
            [6, 6],
            [6, 0],
            [6, 6]
        ],
        [
            [6, 6, 6],
            [6, 0, 6]
        ],
        [
            [6, 6],
            [0, 6],
            [6, 6]
        ]
    ],
    [
        [
            [7, 7, 0],
            [0, 7, 0],
            [0, 7, 7]
        ],
        [
            [0, 0, 7],
            [7, 7, 7],
            [7, 0, 0]
        ]
    ],
    [
        [
            [0, 8],
            [8, 8],
            [0, 8],
            [0, 8]
        ],
        [
            [0, 0, 8, 0],
            [8, 8, 8, 8]
        ],
        [
            [8, 0],
            [8, 0],
            [8, 8],
            [8, 0]
        ],
        [
            [8, 8, 8, 8],
            [0, 8, 0, 0]
        ]
    ]
]

export const MESSAGES = [
    "No blocks were placed",
    "Only one block could be placed",
    "Two blocks were placed",
    "Three blocks were placed",
    "Only half of the blocks could be placed",
    "Five of the eight blocks could be placed",
    "Six of the eight blocks could be placed for this date",
    "Seven of eight blocks could be placed. So close!",
    "Woohoo! All eight blocks could be placed."
]
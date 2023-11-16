import { useSelector } from "react-redux";
import { days, months, pieces, gridSize } from "../utils";
import CalendarSquare from "./CalendarSquare";

export default function Calendar () {
    const puzzle = useSelector((state) => state.puzzle)
    const { grid, shapeId, x, y } = puzzle
    const piece = pieces[shapeId]

    const options = getOptions(piece, grid)
    const newGrid = place(piece, grid, options[0])
    return (
        <div className='grid-container'>
            <div className='grid-squares'>
                {newGrid}
            </div>
        </div>
    )
}

function place (piece, grid, option) {
    const TILES = months.concat(days);
    const [row, col] = option;

    piece.forEach((pieceRow, rowIdx)=>{
        let projRow = rowIdx + row;
        pieceRow.forEach((pieceCol, colIdx) => {
            let projCol = colIdx + col;
            grid[projRow][projCol] = <CalendarSquare color={pieceCol} label={TILES[(projRow * 7) + projCol]} />
        })
    })
    return grid
}

function getOptions (piece, grid) {
    const validOptions = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (validSpot(piece, grid, row, col)) validOptions.push([row, col]);
        }
    }
    return validOptions
}

function validSpot (piece, grid, row, col) {
    piece.forEach((pieceRow, rowIdx)=>{
        let projRow = rowIdx + row;
        pieceRow.forEach((pieceCol, colIdx)=>{
            let projCol = colIdx + col;
            if (projRow >= gridSize || projCol >= gridSize) {
                return false
            } else if (grid[projRow][projCol]<=0) {
                return false
            }
        })
    })
    return true
}
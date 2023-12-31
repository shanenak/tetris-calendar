import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { blockDates, MONTHS_ONLY, GRID_SIZE, PIECES, makeCalendar, getDeepCopy} from "../utils";
import { receiveGrid } from "../actions";
import { getSolutions } from "../reducers/puzzle-reducer";
import './Puzzle.css'

export default function Puzzle () {
    const solutionList = useSelector((state)=> state.puzzle.solutions)
    const dispatch = useDispatch();
    // set date
    const [month, setMonth] = useState('Nov');
    const monthStr = MONTHS_ONLY.indexOf(month).toString().padStart(2, '0')
    const [date, setDate] = useState(20);
    const dateStr = date.toString().padStart(2, '0')
    const blockedGrid = blockDates(month, date)
    const [selectedSolution, setSelectedSolution] = useState(0);

    useEffect(()=>{
        dispatch(receiveGrid(blockedGrid))
        dispatch(getSolutions(blockedGrid))
    }, [month, date])
    
    // update selected date
    const updateDate = (e) => {
        setSelectedSolution(0);
        const dateValues = e.target.value.split("-");
        setMonth(MONTHS_ONLY[parseInt(dateValues[1])]);
        setDate(parseInt(dateValues[2]));
    }

    // update selected solution to display
    const updateSolution = (e) => {
        setSelectedSolution(e.target.value)
    }
    
    return (
        <div className='puzzle'>
            <div className='header'>
                <a href="https://github.com/shanenak/tetris-calendar">
                    <i className="fa-brands fa-square-github"></i>
                </a>
            </div>
            <h1>Tetris Calendar</h1>
            <p className='description'>Tetris pieces have been placed to reveal the selected day. Browse the best solutions for each calendar date.</p>
            <label className='input-label'>Date
                <input type="date" id="start" name="trip-start" value={`2023-${monthStr}-${dateStr}`} min="2023-01-01" max="2023-12-31" onChange={updateDate}/>
            </label>

            <Calendar grid={makeCalendar((solutionList?.length ? solutionList[selectedSolution] : blockedGrid))}/>

            <label className='input-label'>Solutions
                <select name="solutions" onChange={updateSolution}>
                    {solutionList.map((solution, solutionIdx)=> {
                        return (
                            <option value={solutionIdx} key={solution}>{solutionIdx+1}</option>
                        )
                    })}
                </select>
            </label>
        </div>
    )
}

export function attemptSolves (grid) {
    // TODO: check optimal order of pieces, for now order is randomized
    let randomizedPieces = PIECES.sort(() => Math.random() - 0.5);
    let temp = solve(grid, randomizedPieces, 0);
    return {8: temp}
}

// recursively get solutions for selected piece and grid with dates blocked
function solve (grid, randomizedPieces, i) {
    const rotatedPieces = randomizedPieces[i];
    if (i>PIECES.length-1){
        return [grid]
    } 
    let res =[];
    for (let currPiece of rotatedPieces) {
        let nextGrids = getNextGrids(currPiece, grid);
        for (let next of nextGrids) {
            let nextSol = solve(next, randomizedPieces, i+1)
            res = res.concat(nextSol)
    }}
    return res
}

// add piece to grid 
function addPiece (piece, grid, coord) {
    const [row, col] = coord;
    const gridCopy = getDeepCopy(grid);
    for (let pieceRow=0; pieceRow<piece.length; pieceRow++) {
        let projRow = row + pieceRow;
        for (let pieceCol=0; pieceCol<piece[0].length; pieceCol++) {
            let projCol = col + pieceCol;
            if (piece[pieceRow][pieceCol]>0) {
                gridCopy[projRow][projCol] = piece[pieceRow][pieceCol];
            }
        }
    }
    return gridCopy
}

// get valid coordinates for the specified piece and corresponding next grids
function getNextGrids (piece, grid) {
    const nextGrids = [];
    let next;
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (checkValidCoordinate(piece, grid, row, col)) {
                next = addPiece(piece, grid, [row, col]);
                nextGrids.push(next)
            }
        }
    }
    return nextGrids
}

// check if coordinate pair is valid for specified piece and current grid
function checkValidCoordinate (piece, grid, row, col) {
    for (let pieceRow=0; pieceRow<piece.length; pieceRow++) {
        let projRow = row + pieceRow;
        if (row>0 && row < GRID_SIZE && grid[row].every(ele=> ele===0)) {
            // break if that row is completely empty, ensure start filling horizontally first
            return false;
        }
        for (let pieceCol=0; pieceCol<piece[0].length; pieceCol++) {
            let projCol = col + pieceCol;
            if (piece[pieceRow][pieceCol]>0) {
                if (projRow >= GRID_SIZE || projCol >= GRID_SIZE) {
                    // break if off the board
                    return false;
                }
                if (grid[projRow][projCol]>0) {
                    // break if spot is filled
                    return false;
                }
            }
        }
    }
    return true
}
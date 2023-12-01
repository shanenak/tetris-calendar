import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { blockDates, MONTHS, GRID_SIZE, PIECES, makeCalendar, getDeepCopy, getRotatedPieces, MESSAGES } from "../utils";
import { receiveGrid } from "../actions";
import { getSolutions } from "../reducers/puzzle-reducer";
import './Puzzle.css'

export default function Puzzle () {
    const solutionList = useSelector((state)=> state.puzzle.solutions)
    console.log('solution list', solutionList)
    const score = useSelector((state)=> state.puzzle.score)
    const dispatch = useDispatch();
    // set date
    const [month, setMonth] = useState('Nov');
    const monthStr = MONTHS.indexOf(month).toString().padStart(2, '0')
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
        const dateValues = e.target.value.split("-");
        setMonth(MONTHS[parseInt(dateValues[1])]);
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

            <h3>{MESSAGES[parseInt(score)]}</h3>
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
    let numPiecesPlaced = 0;
    let attempt = 0;
    let solutions;
    const numAttempts = 3;
    while ((attempt < numAttempts) && (numPiecesPlaced<8)) {
        let randomizedPieces = PIECES.sort(() => Math.random() - 0.5);
        let temp = solve(grid, randomizedPieces);
        solutions = {8: [temp]}
        numPiecesPlaced = Object.keys(solutions);
        attempt ++
    }
    return solutions
}

// get all solutions for grid with dates blocked
function solve (grid, randomizedPieces) {
    const piecesCopy = randomizedPieces.slice(0, randomizedPieces.length-1);
    let rotatedPieces = randomizedPieces[randomizedPieces.length-1];
    console.log('starting with ',piecesCopy.length, grid)
    if (!piecesCopy.length){
        return grid
    } 
    let res =[];
    rotatedPieces.forEach(currPiece => {
        console.log('currpiece', currPiece)
        let coordOptions = getCoordinates(currPiece, grid);
        coordOptions.forEach(option => {
            console.log('trying with option', option);
            let nextGrid = addPiece(currPiece, grid, option);
            res = res.concat(solve(nextGrid, piecesCopy))
        })
    })
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

// get valid coordinates for the specified piece and current grid
function getCoordinates (piece, grid) {
    const validCoordinates = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (row===0 || (row>1 && grid[row-1][col]>0) || (row<(GRID_SIZE-1) && grid[row+1][col]>0) || (col>1 && grid[row][col-1]>0) || (col<(GRID_SIZE-1) && grid[row][col+1]>0)) {
                if (checkValidCoordinate(piece, grid, row, col)) {
                    validCoordinates.push([row, col]);
                }
            }
        }
    }
    return validCoordinates
}

// check if coordinate pair is valid for specified piece and current grid
function checkValidCoordinate (piece, grid, row, col) {
    for (let pieceRow=0; pieceRow<piece.length; pieceRow++) {
        let projRow = row + pieceRow;
        for (let pieceCol=0; pieceCol<piece[0].length; pieceCol++) {
            let projCol = col + pieceCol;
            if (piece[pieceRow][pieceCol]>0) {
                if (projRow >= GRID_SIZE || projCol >= GRID_SIZE) {
                    return false;
                }
                if (grid[projRow][projCol]>0) {
                    return false;
                }
            }
        }
    }
    return true
}
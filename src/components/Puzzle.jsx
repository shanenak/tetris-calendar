import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { blockDates, MONTHS, GRID_SIZE, PIECES, makeCalendar, getDeepCopy, getRotatedPieces, MESSAGES } from "../utils";
import { receiveGrid } from "../actions";
import { getSolutions } from "../reducers/puzzle-reducer";

export default function Puzzle () {
    const solutionList = useSelector((state)=> state.puzzle.solutions)
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
        <div>
            <label>Date
                <input type="date" id="start" name="trip-start" value={`2023-${monthStr}-${dateStr}`} min="2023-01-01" max="2023-12-31" onChange={updateDate}/>
            </label>

            <Calendar grid={makeCalendar((solutionList?.length ? solutionList[selectedSolution] : blockedGrid))}/>

            <h3>{MESSAGES[parseInt(score)]}</h3>
            <label>
                <select name="solutions" onChange={updateSolution}>
                    {solutionList.map((solution, solutionIdx)=> {
                        return (
                            <option value={solutionIdx}>{solutionIdx+1}</option>
                        )
                    })}
                </select>
            </label>
        </div>
    )
}

// get all solutions for grid with dates blocked
export function solve (grid) {
    const solutions = {0: [grid]};

    for (let i=0; i<PIECES.length; i++) {
        solutions[i+1]=[];
        const rotatedPieces = getRotatedPieces(PIECES[i]);
        for (let j=0; j<rotatedPieces.length; j++) {
            let currPiece = rotatedPieces[j];
            // limit to only 10,000 solutions being considered at a time to reduce loading time
            // increasing to 40,000 didn't seem to impact results much
            const maxSolutions = Math.min(solutions[i]?.length, 10000)
            for (let solIdx=0; solIdx<maxSolutions; solIdx++) {
                let currSolution = solutions[i][solIdx];
                let currCoord = getCoordinates(currPiece, currSolution)
                if (currCoord?.length>0) {
                    // if there are no options for the current piece to be placed, try next
                    for (let j=0; j<currCoord.length; j++) {
                        let nextSolution = addPiece(currPiece, currSolution, currCoord[j]);
                        solutions[i+1].push(nextSolution);
                    }
                }
            }
        }
        if (solutions[i+1].length>0) {
            // if continuing, remove the outdated solutions (before the current piece has been placed)
            delete solutions[i];
        } else {
            // if cannot progress, remove next key/value pair and break
            delete solutions[i+1];
            break;
        }
        
    }
    return solutions; // index at 0 because values are already arrays
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
            if (checkValidCoordinate(piece, grid, row, col)) {
                validCoordinates.push([row, col]);
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
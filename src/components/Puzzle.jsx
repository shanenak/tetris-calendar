import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { blockDates, months, gridSize, pieces, gridToCalendar, deepCopy } from "../utils";
import { receiveGrid } from "../actions";

export default function Puzzle () {
    let grid = useSelector((state)=> state.puzzle.grid)
    const dispatch = useDispatch();
    const [month, setMonth] = useState('Nov');
    const monthStr = months.indexOf(month).toString().padStart(2, '0')
    const [date, setDate] = useState(20);
    const dateStr = date.toString().padStart(2, '0')

    const blockedGrid = blockDates(month, date)
    const solutionList = solve(blockedGrid);
    console.log(solutionList)
    const [selectedSolution, setSelectedSolution] = useState(0);

    useEffect(()=>{
        dispatch(receiveGrid(blockedGrid))
    }, [month, date])
    
    const updateDate = (e) => {
        const dateValues = e.target.value.split("-");
        setMonth(months[parseInt(dateValues[1])]);
        setDate(parseInt(dateValues[2]));
    }

    const updateSolution = (e) => {
        setSelectedSolution(e.target.value)
    }

    return (
        <div>
            <label>Date
                <input type="date" id="start" name="trip-start" value={`2023-${monthStr}-${dateStr}`} min="2023-01-01" max="2023-12-31" onChange={updateDate}/>
            </label>
            <Calendar grid={gridToCalendar((solutionList?.length ? solutionList[selectedSolution] : grid))}/>
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

function solve (grid) {
    const solutions = {0: [grid]};
    for (let i=0;i<pieces.length;i++) {
        let currPiece = pieces[i];
        let currSolution = solutions[i][0];
        let currOptions = getOptions(currPiece, currSolution)
        if (currOptions.length===0) {
            break;
        } else {
            solutions[i+1]=[];
            for (let j=0; j<currOptions.length; j++) {
                solutions[i+1].push(place(currPiece, currSolution, currOptions[j]))
            }
        }
        delete solutions[i];
    }
    return Object.values(solutions)[0]; // index at 0 because values are already arrays
}

function place (piece, grid, option) {
    const [row, col] = option;
    const gridCopy = deepCopy(grid);
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

function getOptions (piece, grid) {
    const validOptions = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (validSpot(piece, grid, row, col)) {
                validOptions.push([row, col]);
            }
        }
    }
    return validOptions
}

function validSpot (piece, grid, row, col) {
    for (let pieceRow=0; pieceRow<piece.length; pieceRow++) {
        let projRow = row + pieceRow;
        for (let pieceCol=0; pieceCol<piece[0].length; pieceCol++) {
            let projCol = col + pieceCol;
            if (piece[pieceRow][pieceCol]>0) {
                if (projRow >= gridSize || projCol >= gridSize) {
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
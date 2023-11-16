import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { blockDates, tiles, months, gridSize } from "../utils";
import CalendarSquare from "./CalendarSquare";
import { receiveGrid } from "../actions";

export default function Puzzle () {
    // let grid = useSelector((state)=> state.puzzle.grid)
    const dispatch = useDispatch();
    const [month, setMonth] = useState('Nov');
    const monthStr = months.indexOf(month).toString().padStart(2, '0')
    const [date, setDate] = useState(20);
    const dateStr = date.toString().padStart(2, '0')

    useEffect(()=>{
        dispatch(receiveGrid(blockDates(month, date)))
    }, [month, date])
    
    const updateDate = (e) => {
        const dateValues = e.target.value.split("-");
        setMonth(months[parseInt(dateValues[1])]);
        setDate(parseInt(dateValues[2]));
    }

    return (
        <div>
            <label>Date
                <input type="date" id="start" name="trip-start" value={`2023-${monthStr}-${dateStr}`} min="2023-01-01" max="2023-12-31" onChange={updateDate}/>

            </label>
            <Calendar />
        </div>
    )
}


function place (piece, grid, option) {
    const [row, col] = option;

    piece.forEach((pieceRow, rowIdx)=>{
        let projRow = rowIdx + row;
        pieceRow.forEach((colValue, colIdx) => {
            let projCol = colIdx + col;
            grid[projRow][projCol] = <CalendarSquare color={colValue} label={tiles[(projRow * 7) + projCol]} />
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
        pieceRow.forEach((colValue, colIdx)=>{
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
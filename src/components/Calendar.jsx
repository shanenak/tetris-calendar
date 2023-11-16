import { useSelector } from "react-redux";
import { pieces } from "../utils";

export default function Calendar () {
    const puzzle = useSelector((state) => state.puzzle)
    const { grid, shapeId } = puzzle
    // const piece = pieces[shapeId]

    // const options = getOptions(piece, grid)
    // const newGrid = place(piece, grid, options[0])
    return (
        <div className='grid-container'>
            <div className='grid-squares'>
                {grid}
            </div>
        </div>
    )
}

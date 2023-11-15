import CalendarSquare from "./CalendarSquare";

export default function Calendar () {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', '', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];
    const DAYS = [...Array(31).keys()].map(ele => ele + 1);
    const TILES = MONTHS.concat(DAYS);
    const grid = [];
    for (let row=0; row<7; row++) {
        grid.push([]);
        for (let col=0; col<7; col++) {
            grid[row].push(<CalendarSquare key={`${col}${row}`}color='0' label={TILES[(row*7)+col]}/>)
        }
    }

    return (
        <div className='grid-container'>
            <div className='grid-squares'>
                {grid}
            </div>
        </div>
    )
}
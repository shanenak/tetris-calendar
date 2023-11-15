import CalendarSquare from "./CalendarSquare";

export default function Calendar () {
    const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', '', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '']
    const daysList = [...Array(31).keys()].map(ele => ele + 1)
    
    return (
        <div className='grid-container'>
            <div className='grid-squares'>
                {monthsList.concat(daysList).map(label=> <CalendarSquare shape='0' label={label}/>)}
            </div>
        </div>
    )
}
import React from "react";
import './Calendar.css'

export default function CalendarSquare(props) {
    return (
        <div className={`square color-${props.color}`}>
            <p>{props.label}</p>
        </div>
    )
}
import React from "react";

export default function Calendar ({ grid }) {
    return (
        <div className='grid-container'>
            <div className='grid-squares'>
                {grid}
            </div>
        </div>
    )
}

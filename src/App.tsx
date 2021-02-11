import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";

type Square = {
    id: string,
    color: string,
    hidden: boolean,
}
//
// type StateType = Array<Square>
//

const App = () => {

    const colors: Array<string> = [
        'red', 'orange', 'yellow', 'green', 'aquamarine', 'blue', 'magenta', 'indigo',
    ]


    const sortArray = (array: Array<string>) => {
        array.forEach((color, i) => {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        })
        return array
    }

    const doubleColors = colors.concat(...colors);

    sortArray(doubleColors);


    const allSmallSquares: Array<Square> = doubleColors.map(c => ({id: v1(), color: c, hidden: true}))

    return (
        <div className="App">

            {allSmallSquares.map(s => <div key={s.id}>{s.color}</div>)}

        </div>
    );
}

export default App;

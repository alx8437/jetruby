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

  const [colors, setColors] = useState<Array<string>>(
      ['red', 'orange', 'yellow', 'green', 'aquamarine', 'blue', 'magenta', 'indigo'])



   colors.forEach((color, i) => {
    const j = Math.floor(Math.random() * i)
    const temp = colors[i]
    colors[i] = colors[j]
    colors[j] = temp
  })


  const allSmallSquares: Array<Square> = colors.map(c => ({id: v1(), color: c, hidden: true}))

  return (
      <div className="App">
        {allSmallSquares.map(s => <div>{s.color}</div>)}
      </div>
  );
}

export default App;

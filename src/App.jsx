import { useState } from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dices, setDices] = useState(generateDices());

  function generateDices() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const diceValues = dices.map((dice) => {
    return <Die value={dice}></Die>;
  });

  return (
    <div className="App">
      <div className="main">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid-wrapper">{diceValues}</div>
      </div>
    </div>
  );
}

export default App;

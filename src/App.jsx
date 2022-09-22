import { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const [dices, setDices] = useState(generateDices());

  function generateDices() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function generateDiceHandler() {
    setDices(generateDices());
  }

  const diceValues = dices.map((dice) => {
    return <Die value={dice.value} key={dice.id}></Die>;
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
        <button onClick={generateDiceHandler} className="roll">
          Roll
        </button>
      </div>
    </div>
  );
}

export default App;

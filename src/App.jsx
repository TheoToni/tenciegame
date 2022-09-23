import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dices, setDices] = useState(generateDices());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dices.every((die) => die.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("YOU WON");
    }
  }, [dices]);

  function generateDices() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewdie());
    }
    return newDice;
  }

  function generateNewdie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  //click on the button generates 10 new dices
  function generateDiceHandler() {
    //if the player already won then generate new dices
    if (tenzies) {
      setTenzies(false);
      setDices(generateDices);
    } else
      setDices((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewdie();
        })
      );
  }

  function holdDice(id) {
    //if a die was clicked flip its isHeld prop
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  //turns the dice objects into components
  const diceValues = dices.map((dice) => {
    return (
      <Die
        value={dice.value}
        key={dice.id}
        isHeld={dice.isHeld}
        //important here is calling anonym. function before so you can just pass a parameter to the holdDice() otherwise
        //you could not do that because it would need to hold the event as standard parameter.
        holdDice={() => holdDice(dice.id)}
      ></Die>
    );
  });

  return (
    <div className="App">
      <div className="main">
        {tenzies && <Confetti></Confetti>}
        <h1>Tenzies</h1>
        <p>
          {tenzies === false
            ? "Roll until all dice are same. Click each die to freeze it at its current value between rolls."
            : "YOU WON THE GAME"}
        </p>
        <div className="grid-wrapper">{diceValues}</div>
        <button onClick={generateDiceHandler} className="roll">
          {tenzies === true ? "Play Again" : "Role"}
        </button>
      </div>
    </div>
  );
}

export default App;

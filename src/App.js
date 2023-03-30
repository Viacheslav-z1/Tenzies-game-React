import React from "react";
import "./App.css";
import Die from "./components/die/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [numbers, setNumbers] = React.useState(allNewDice());

   const [tenzies, setTenzies] = React.useState(false);

   React.useEffect(() => {
     const allHeld = numbers.every((die) => die.isHeld);
     const firstValue = numbers[0].value;
     const allSameValue = numbers.every((die) => die.value === firstValue);
     if (allHeld && allSameValue) {
       setTenzies(true);
       console.log("You won!");
     }
   }, [numbers]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let obj = newDie();
      newDice.push(obj);
    }
    return newDice;
  }


  function newDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

     function rollDice() {
       if (!tenzies) {
         setNumbers((oldDice) =>
           oldDice.map((die) => {
             return die.isHeld ? die : newDie();
           })
         );
       } else {
         setTenzies(false);
         setNumbers(allNewDice());
       }
     }

  function holdDice(id) {
    setNumbers((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main className="main">
      <div className="main__container">
        {tenzies && <Confetti />}
        <h2 className="main__title">Tenzies</h2>
        <p className="main__descr">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="main__wrapper">
          {numbers.map((item) => (
            <Die
              holdDice={() => holdDice(item.id)}
              isHeld={item.isHeld}
              id={item.id}
              value={item.value}
              key={item.id}
            />
          ))}
        </div>
        <button className="main__btn" onClick={rollDice}>
          {tenzies ? "New game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;

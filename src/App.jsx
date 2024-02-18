import { useEffect, useState } from "react";

export default function App() {
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 20) + 1
  );
  const [showSecretNum, setShowSecretNum] = useState("?");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("Start guessing...");
  const [backgroundColor, setBackgroundColor] = useState("#222");

  useEffect(function () {
    document.title = "Guess My Number";
  }, []);

  function handleCheckGuess(number) {
    console.log(secretNumber);
    if (number === secretNumber) {
      setShowSecretNum(secretNumber);
      setMessage("🎉 Correct number!");
      setBackgroundColor("#60b347");

      if (highScore < score) setHighScore(score);
    } else {
      if (number < secretNumber) setMessage("📉 Too low!");
      else setMessage("📈 Too high!");

      setScore(score - 1);
    }
  }

  function handleAgain() {
    setShowSecretNum("?");
    setInput("");
    setScore(20);
    setMessage("Start guessing...");
    setBackgroundColor("#222");
    setSecretNumber(Math.floor(Math.random() * 20) + 1);
  }

  return (
    <div style={{ background: backgroundColor }}>
      <Header showSecretNum={showSecretNum} onAgain={handleAgain} />
      <Main
        onCheckGuess={handleCheckGuess}
        input={input}
        setInput={setInput}
        score={score}
        highScore={highScore}
        message={message}
      />
    </div>
  );
}

function Header({ showSecretNum, onAgain }) {
  return (
    <header>
      <h1>Guess My Number!</h1>
      <p className="between">(Between 1 and 20)</p>
      <button className="btn again" onClick={onAgain}>
        Again!
      </button>
      <div className="number">{showSecretNum}</div>
    </header>
  );
}

function Main({ onCheckGuess, input, setInput, score, highScore, message }) {
  return (
    <main>
      <Input onCheckGuess={onCheckGuess} input={input} setInput={setInput} />
      <Description score={score} highScore={highScore} message={message} />
    </main>
  );
}

function Input({ onCheckGuess, input, setInput }) {
  return (
    <section className="left">
      <input
        type="number"
        className="guess"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <button className="btn check" onClick={() => onCheckGuess(input)}>
        Check!
      </button>
    </section>
  );
}

function Description({ score, highScore, message }) {
  return (
    <section className="right">
      <p className="message">{message}</p>
      <p className="label-score">
        💯 Score: <span className="score">{score}</span>
      </p>
      <p className="label-highscore">
        🥇 Highscore: <span className="highscore">{highScore}</span>
      </p>
    </section>
  );
}

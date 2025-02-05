import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DieButton from "./components/DieButton";

function App() {
  const dice = {
    1: <Dice1 size={65} />,
    2: <Dice2 size={65} />,
    3: <Dice3 size={65} />,
    4: <Dice4 size={65} />,
    5: <Dice5 size={65} />,
    6: <Dice6 size={65} />,
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [playerRolls, setPlayerRolls] = useState(0);
  const [compRolls, setCompRolls] = useState(0);
  const [dieButtons, setDieButtons] = useState([
    { id: 1, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 2, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 3, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 4, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 5, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 6, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 7, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 8, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 9, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
    { id: 10, value: Math.floor(Math.random() * 6) + 1, isLocked: false },
  ]);

  const selectedDie = useRef(0);
  const clickedButtons = useRef(0);

  function playGame() {
    setIsPlaying(true);
    setPlayerRolls((prev) => prev + 1);
    setCompRolls(Math.floor(Math.random() * (25 - 7 + 1) + 7));
  }

  function lockButton(id, num) {
    setDieButtons((prev) =>
      prev.map((button) =>
        id === button.id && num === selectedDie.current && !button.isLocked
          ? { ...button, isLocked: true }
          : button
      )
    );
    if (selectedDie.current === 0) {
      selectedDie.current = num;
    }

    // Last button clicked to end the game
    if (clickedButtons.current >= 9) {
      if (num === selectedDie.current) {
        if (playerRolls === compRolls) {
          setGameResult("Draw!");
        } else if (playerRolls < compRolls) {
          setGameResult("You Win!!!");
        } else {
          setGameResult("You Lose..");
        }
      }
    }
  }

  function rollDice() {
    setDieButtons((prev) =>
      prev.map((button) =>
        button.isLocked
          ? button
          : { ...button, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
    setPlayerRolls((prev) => prev + 1);
  }

  function finishGame() {
    setIsPlaying(false);
    setGameResult("");
    setPlayerRolls(0);
    setCompRolls(0);
    setDieButtons((prev) =>
      prev.map((button) =>
        button.isLocked === true
          ? {
              ...button,
              value: Math.floor(Math.random() * 6) + 1,
              isLocked: false,
            }
          : button
      )
    );
    selectedDie.current = 0;
    clickedButtons.current = 0;
  }

  // count how many button is successfully clicked
  useEffect(() => {
    clickedButtons.current = dieButtons.filter(
      (button) => button.isLocked
    ).length;
  }, [dieButtons]);

  return (
    <div className="min-h-screen bg-sky-950 p-10">
      <h1 className="text-lime-500 text-7xl font-extrabold letter-spacing tracking-wider text-center">
        {isPlaying ? (gameResult ? gameResult : "Player") : "Tenzies"}
      </h1>

      {/* Status */}
      {gameResult === "" && isPlaying && (
        // this will appear in game screen only
        <div className="flex flex-col gap-1 absolute top-0 left-0 p-4">
          <p className="text-white text-lg">Comp: {compRolls} rolls</p>
          <p className="text-white text-lg">You:</p>
        </div>
      )}

      {/* Game */}
      <main>
        {isPlaying ? (
          // Game screen
          <div className="w-full h-[30rem] flex flex-col justify-center items-center gap-5 p-5 ">
            {gameResult ? (
              <div className="flex gap-10">
                <p className="text-lime-200 text-3xl font-semibold">
                  You: {playerRolls} rolls
                </p>
                <p className="text-lime-200 text-3xl font-semibold">
                  Computer: {compRolls} rolls
                </p>
              </div>
            ) : (
              <p className="text-white text-2xl">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
              </p>
            )}

            <p className="text-3xl text-lime-500 font-semibold">
              Rolls: {playerRolls}
            </p>
            <div className="grid grid-rows-2 grid-cols-5 gap-6">
              {dieButtons.map((button) => (
                <DieButton
                  key={button.id}
                  icon={dice[button.value]}
                  style={
                    button.isLocked
                      ? { backgroundColor: "#A3E635" }
                      : { backgroundColor: "#D1D5DB" }
                  }
                  isDisabled={button.isLocked}
                  onClick={() => lockButton(button.id, button.value)}
                />
              ))}
            </div>
            {gameResult ? (
              <button
                onClick={finishGame}
                className="bg-blue-400 text-3xl px-10 py-3 font-bold mt-10 rounded-xl transition-colors duration-200 hover:bg-blue-300 cursor-pointer"
              >
                Done
              </button>
            ) : (
              <button
                onClick={rollDice}
                className="bg-lime-400 text-3xl px-10 py-3 font-bold mt-10 rounded-xl transition-colors duration-200 hover:bg-lime-500 cursor-pointer"
              >
                Roll
              </button>
            )}
          </div>
        ) : (
          // Home screen
          <div className="w-full h-[27rem] flex justify-center items-center">
            <button
              onClick={playGame}
              className="px-10 py-5 bg-lime-300 text-black text-4xl font-bold transition-colors duration-300 hover:bg-lime-200 cursor-pointer"
            >
              Play
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

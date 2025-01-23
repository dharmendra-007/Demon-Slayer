import React, { useState, useEffect } from "react";
import ReturnGameSectionButton from "../components/returnGameSectionButton";
import ReturnHomeSectionButton from "../components/returnHomeSectionButton";

function SlayerBattleGrid() {
  const [gameData, setGameData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [isVsBot, setIsVsBot] = useState(false);
  const [botThinking, setBotThinking] = useState(false);
  const [title, setTitle] = useState("Slayer Battle Grid");

  useEffect(() => {
    // Effect to handle bot's move after player's move
    if (isVsBot && count % 2 === 1 && !lock && !botThinking) {
      makeBotMove();
    }
  }, [count, isVsBot, lock, botThinking]);

  const checkEmpty = (board) => {
    return board.filter((cell) => cell === "").length;
  };

  const findBestMove = (board) => {
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "o";
        if (checkWinner(board) === "o") {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }

    // Block player's winning move
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "x";
        if (checkWinner(board) === "x") {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }

    // Try to take center
    if (board[4] === "") {
      return 4
    };

    // Try to take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => board[i] === "");
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter((i) => board[i] === "");
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    return -1;
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return "";
  };

  const makeBotMove = () => {
    if (lock) {
      return
    };

    setBotThinking(true);

    setTimeout(() => {
      const currentGameData = [...gameData];
      const bestMove = findBestMove(currentGameData);

      if (bestMove !== -1 && currentGameData[bestMove] === "") {
        const updatedGameData = [...currentGameData];
        updatedGameData[bestMove] = "o";
        setGameData(updatedGameData);
        setCount((prev) => prev + 1);

        const winner = checkWinner(updatedGameData);
        if (winner) {
          won(winner);
        } else if (checkEmpty(updatedGameData) === 0) {
          setTitle("It's a Draw!");
          setLock(true);
        }
      }
      setBotThinking(false);
    }, 500);
  };

  const toggle = (num) => {
    if (lock || gameData[num] !== "" || botThinking) {
      return;
    }

    const newGameData = [...gameData];

    if (count % 2 === 0) {
      newGameData[num] = "x";
      setGameData(newGameData);
      setCount((prev) => prev + 1);

      const winner = checkWinner(newGameData);
      if (winner) {
        won(winner);
        return;
      } else if (checkEmpty(newGameData) === 0) {
        setTitle("It's a Draw!");
        setLock(true);
        return;
      }
    } else if (!isVsBot) {
      newGameData[num] = "o";
      setGameData(newGameData);
      setCount((prev) => prev + 1);

      const winner = checkWinner(newGameData);
      if (winner) {
        won(winner);
      } else if (checkEmpty(newGameData) === 0) {
        setTitle("It's a Draw!");
        setLock(true);
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      setTitle(
        <span className="flex items-center justify-center">
          Congratulations!{" "}
          <img
            src="/images/tanjiro.png"
            className="h-6 sm:h-8 inline-block mx-4"
            alt="Tanjiro"
          />{" "}
          Won
        </span>
      );
    } else if (winner === "o") {
      setTitle(
        <span className="flex items-center justify-center">
          {isVsBot ? "Oh no!" : "Congratulations!"}{" "}
          <img
            src="/images/muzan.png"
            className="h-6 sm:h-10 inline-block mx-4"
            alt="Muzan"
          />{" "}
          Won
        </span>
      );
    }
  };

  const reset = () => {
    setGameData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setBotThinking(false);
    setTitle("Slayer Battle Grid");
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white max-h-screen h-[100svh] overflow-hidden">
    <div className="flex justify-between items-start w-[80%] h-[10vh] sm:h-[15vh]">
      <ReturnHomeSectionButton />
      <ReturnGameSectionButton />
    </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 flex items-center justify-center">
        {title}
      </h1>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            isVsBot ? "bg-gray-600" : "bg-teal-500 text-gray-900"
          }`}
          onClick={() => {
            setIsVsBot(false);
            reset();
          }}
        >
          vs Player
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            isVsBot ? "bg-teal-500 text-gray-900" : "bg-gray-600"
          }`}
          onClick={() => {
            setIsVsBot(true);
            reset();
          }}
        >
          vs Bot
        </button>
      </div>
      <div
        className={`grid grid-cols-3 gap-4 mb-6 ${
          botThinking ? "pointer-events-none opacity-80" : ""
        }`}
      >
        {gameData.map((value, index) => (
          <div
            key={index}
            className="h-24 sm:h-32 w-24 sm:w-32 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer border-2 border-gray-600 hover:bg-gray-600 transition-colors"
            onClick={() => toggle(index)}
          >
            {value && (
              <img
                src={value === "x" ? "/images/tanjiro.png" : "/images/muzan.png"}
                className="h-10 w-10 mx-auto"
                alt={value}
              />
            )}
          </div>
        ))}
      </div>
      <button
        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold rounded-3xl shadow-md transition-colors"
        onClick={reset}
      >
        Reset
      </button>
    </div>
    </>
  );
}

export default SlayerBattleGrid;

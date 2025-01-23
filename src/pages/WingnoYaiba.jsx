import { useEffect, useState, useCallback, useRef } from "react";
import ReturnHomeSectionButton from "../components/returnHomeSectionButton";
import ReturnGameSectionButton from "../components/returnGameSectionButton";

const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 550;
const DEFAULT_WALL_WIDTH = 400;
const BIRD_X_POSITION = 100;

const DIFFICULTY_SETTINGS = {
  easy: {
    gravity: 6,
    objSpeed: 3,
    objGap: 250,
    jumpForce: 60
  },
  medium: {
    gravity: 8,
    objSpeed: 4,
    objGap: 200,
    jumpForce: 50
  },
  hard: {
    gravity: 10,
    objSpeed: 6,
    objGap: 160,
    jumpForce: 45
  }
};

const OBJ_WIDTH = 52;

function WingnoYaiba() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirdpos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(DEFAULT_WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('wingNoYaibaHighScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [wallWidth, setWallWidth] = useState(DEFAULT_WALL_WIDTH);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameOver, setGameOver] = useState(false);

  const birdRef = useRef(null);
  const topPipeRef = useRef(null);
  const bottomPipeRef = useRef(null);

  const currentSettings = DIFFICULTY_SETTINGS[difficulty];

  // Resize effect
  useEffect(() => {
    const updateWidth = () => {
      setWallWidth(window.innerWidth >= 768 ? 450 : DEFAULT_WALL_WIDTH);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Precise Collision Detection
  const checkCollision = useCallback(() => {
  if (!birdRef.current || !topPipeRef.current || !bottomPipeRef.current)
    { 
      return false;
    }

    const birdRect = birdRef.current.getBoundingClientRect();
    const topPipeRect = topPipeRef.current.getBoundingClientRect();
    const bottomPipeRect = bottomPipeRef.current.getBoundingClientRect();

    const hasTopPipeCollision = !(
      birdRect.right < topPipeRect.left || 
      birdRect.left > topPipeRect.right || 
      birdRect.bottom < topPipeRect.top || 
      birdRect.top > topPipeRect.bottom
    );

    const hasBottomPipeCollision = !(
      birdRect.right < bottomPipeRect.left || 
      birdRect.left > bottomPipeRect.right || 
      birdRect.bottom < bottomPipeRect.top || 
      birdRect.top > bottomPipeRect.bottom
    );

    return hasTopPipeCollision || hasBottomPipeCollision;
  }, []);

  // Gravity effect
  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT && !gameOver) {
      intVal = setInterval(() => {
        setBirdpos((prev) => {
          const newPos = prev + currentSettings.gravity;
          
          // Floor collision
          if (newPos >= WALL_HEIGHT - BIRD_HEIGHT) {
            triggerGameOver();
            return newPos;
          }
          
          // Collision check
          if (checkCollision()) {
            triggerGameOver();
          }
          
          return newPos;
        });
      }, 24);
    }
    return () => clearInterval(intVal);
  }, [isStart, birdpos, currentSettings, gameOver, checkCollision]);

  // Object movement and scoring
  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH && !gameOver) {
      objval = setInterval(() => {
        setObjPos((prev) => prev - currentSettings.objSpeed);
      }, 24);

      return () => clearInterval(objval);
    } else if (isStart && !gameOver) {
      setObjPos(wallWidth);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - currentSettings.objGap)));
      setScore((prev) => prev + 7);
    }
  }, [isStart, objPos, wallWidth, currentSettings, gameOver]);

  // Update highscore
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('wingNoYaibaHighScore', score.toString());
    }
  }, [score, highScore]);

  // Game over function
  const triggerGameOver = useCallback(() => {
    setIsStart(false);
    setGameOver(true);
  }, []);

  // Click handler for bird movement
  const handler = () => {
    if (!isStart) {
      setIsStart(true);
      setGameOver(false);
      setBirdpos(300);
      setScore(0);
      setObjPos(wallWidth);
    } else if (gameOver) {
      setGameOver(false);
      setBirdpos(300);
      setScore(0);
      setObjPos(wallWidth);
    } else if (birdpos < BIRD_HEIGHT) {
      setBirdpos(0);
    } else {
      setBirdpos((prev) => prev - currentSettings.jumpForce);
    }
  };

  // Difficulty change handler
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setIsStart(false);
    setGameOver(false);
    setBirdpos(300);
    setScore(0);
    setObjPos(DEFAULT_WALL_WIDTH);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 text-white max-h-screen h-[100svh] overflow-hidden">  
      <div className="flex flex-row justify-between items-center h-[10vh] w-[80%]">
        <ReturnHomeSectionButton/>
        <ReturnGameSectionButton/>
      </div>
      <div className="text-4xl font-bold mt-3 font-Pixel-Army">Wings no Yaiba</div>
      
      <div className="flex gap-2 my-3">
        <div className="text-lg font-bold">Score: {score}</div>
        <div className="text-lg font-bold">High Score: {highScore}</div>
      </div>
      
      <div className="flex gap-4 mb-4">
        {Object.keys(DIFFICULTY_SETTINGS).map((diff) => (
          <button
            key={diff}
            onClick={() => changeDifficulty(diff)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              difficulty === diff
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div
        className="relative overflow-hidden border-2 border-black"
        style={{
          height: `${WALL_HEIGHT}px`,
          width: `${wallWidth}px`,
          backgroundImage: "url('/images/background-day.png')",
          backgroundSize: `${wallWidth}px ${WALL_HEIGHT}px`,
        }}
        onClick={handler}
      >
        {(!isStart || gameOver) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-center p-2 rounded-lg text-lg font-semibold cursor-pointer z-10">
            {gameOver ? "Game Over! Click to Restart" : "Click To Start"}
          </div>
        )}

        <div
          ref={topPipeRef}
          className="absolute"
          style={{
            height: `${objHeight}px`,
            width: `${OBJ_WIDTH}px`,
            left: `${objPos}px`,
            top: `0px`,
            backgroundImage: "url('/images/pipe-green.png')",
            transform: "rotate(180deg)",
          }}
        ></div>

        <div
          ref={birdRef}
          className="absolute"
          style={{
            height: `${BIRD_HEIGHT}px`,
            width: `${BIRD_WIDTH}px`,
            top: `${birdpos}px`,
            left: `${BIRD_X_POSITION}px`,
            backgroundImage: "url('/images/shinobuNoBg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div
          ref={bottomPipeRef}
          className="absolute"
          style={{
            height: `${WALL_HEIGHT - currentSettings.objGap - objHeight}px`,
            width: `${OBJ_WIDTH}px`,
            left: `${objPos}px`,
            top: `${WALL_HEIGHT - (objHeight + (WALL_HEIGHT - currentSettings.objGap - objHeight))}px`,
            backgroundImage: "url('/images/pipe-green.png')",
          }}
        ></div>
      </div>
    </div>
  );
}

export default WingnoYaiba;
import { useState, useEffect, useContext, memo } from 'react';
import { ClueContext } from '../CellContext';

type Answer = {
  answer: boolean;
  setAnswer: (val: boolean) => void;
};

type Clue = {
  id: string | null;
  game_id: number | null;
  value: number | null;
  daily_double: boolean | null;
  round: string | null;
  category: string | null;
  clue: string | null;
  response: string | null;
};

const ClueDiv = () => {
  const clueContext = useContext(ClueContext);
  const [catCell, setCatCell] = useState<Clue | null>(null);
  const [show, setShow] = useState<string | null>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const pickAClueMSG = 'Pick a Value!';
  const answerFirstMSG = 'Finish this clue before picking a new Value!';
  const finalMsg = 'Only one left! You got this!';

  const changeClueDiv = () => {
    setShow(catCell?.response);
    setDisabled(true);
    clueContext?.setAnswer(false);
    clueContext?.setGameProgress((prev) => prev + 1);
  };

  useEffect(() => {
    if (clueContext?.clue) {
      setCatCell(clueContext?.clue);
    }
  }, [clueContext?.clue]);

  useEffect(() => {
    setShow('');
    setDisabled(false);
  }, [catCell]);

  useEffect(() => {
    if (clueContext?.gameProgress === 25) {
      setGameOver(true);
    }
  }, [clueContext?.gameProgress]);

  return (
    <>
      {!gameOver && (
        <div
          className="d-block justify-content-center text-center mt-5 "
          style={{ fontWeight: '700', color: 'white', fontSize: '1.5rem' }}
        >
          {' '}
          {clueContext?.answer
            ? clueContext.gameProgress === 24
              ? finalMsg
              : answerFirstMSG
            : pickAClueMSG}
        </div>
      )}
      {gameOver && (
        <div
          className="d-block justify-content-center text-center mt-5 "
          style={{ fontWeight: '700', color: 'white', fontSize: '1.5rem' }}
        >
          GAME OVER!
        </div>
      )}
      <div className="clue-div">
        {catCell && (
          <>
            <div>Value: ${catCell?.value}</div>
            <div>Category: {catCell?.category}</div>
            <div>{catCell?.clue}</div>
            <button onClick={() => changeClueDiv()} disabled={disabled}>
              Answer
            </button>

            {show && (
              <div>
                {' '}
                Answer: <br></br>
                {show}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default memo(ClueDiv);

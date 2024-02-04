import { useState, useEffect, useContext, memo } from 'react';
import { ClueContext } from '../CellContext';

type ClueProp = {
  gameOver: boolean;
  setGameOver: (val: boolean) => void;
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

const ClueDiv = ({ gameOver, setGameOver }: ClueProp) => {
  const clueContext = useContext(ClueContext);
  const [catCell, setCatCell] = useState<Clue | null>(null);
  const [show, setShow] = useState<string | null>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const pickAClueMSG = 'Pick a value!';
  const answerFirstMSG = 'Finish this clue before picking a new value!';
  const finalMsg = 'Only one left! You got this!';

  const changeClueDiv = () => {
    setShow(catCell?.response);
    setDisabled(true);
    clueContext?.setAnswer(false);
    clueContext?.setGameProgress((prev) => prev + 1);
  };

  useEffect(() => {
    clueContext?.setGameProgress(0);
    clueContext?.setAnswer(false);
    clueContext?.setClue(null);
  }, [gameOver]);

  useEffect(() => {
    if (!clueContext?.clue) {
      setEndGame(false);
      setShow('');
      setDisabled(false);
      setCatCell(null);
    }
  }, [clueContext?.clue]);

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
      setEndGame(true);
    }
  }, [clueContext?.gameProgress]);

  return (
    <>
      {!endGame && (
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
      {endGame && (
        <div
          className="d-block justify-content-center text-center mt-5 "
          style={{ fontWeight: '700', color: 'white', fontSize: '1.5rem' }}
        >
          GAME OVER!
        </div>
      )}
      <div className="clue-div">
        {clueContext?.clue && (
          <>
            <div>Value: ${catCell?.value}</div>
            <div>Category: {catCell?.category}</div>
            <div>{catCell?.clue}</div>
            <button
              onClick={() => changeClueDiv()}
              disabled={disabled}
              className="btn btn-outline-light"
            >
              Answer
            </button>

            {show && (
              <div className="d-flex justify-content-center text-wrap">
                {' '}
                Answer:
                {show}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClueDiv;

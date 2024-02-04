import Cell from './Cell';
import ClueDiv from './ClueDiv';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, memo, useContext } from 'react';
import { ClueContext } from '../CellContext';
import axios from 'axios';

const Board = () => {
  const [clues, setClues] = useState<[][]>();
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [newGame, setNewGame] = useState<boolean>(true);
  const [loadGame, setLoadGame] = useState<boolean>(false);

  const startGame = async () => {
    setLoadGame(true);
    setGameOver(true);
    await getClues();
    setGameOver(false);
    setLoadGame(false);
    setNewGame(false);
  };

  const getClues = async () => {
    const {
      data: { data },
    } = await axios.get('http://localhost:3001/clues/random', {
      params: { limit: 25 },
    });
    let cluesArrays = [];
    while (data.length > 0) {
      cluesArrays.push(data.splice(0, 5));
    }
    setClues(cluesArrays);
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

  // const boardArr: Clue[][] = [];
  // for (let i = 0; i < 5; i++) {
  //   boardArr[i] = clues[i];
  //   for (let j = 0; j < 5; j++) {
  //     boardArr[i][j] = clues[j][i];
  //   }
  // }

  useEffect(() => {
    if (clues) {
      const boardArr: Clue[][] = [];
      for (let i = 0; i < 5; i++) {
        boardArr[i] = clues[i];
        for (let j = 0; j < 5; j++) {
          boardArr[i][j] = clues[i][j];
        }
      }
    }
  }, [clues]);

  return (
    <>
      {gameOver && newGame && (
        <>
          <div className=" d-flex justify-content-center flex-column align-items-center game-title-container">
            <div className="d-flex flex-column align-items-center">
              <div>
                <h5 className="title">JEOPARDY</h5>
              </div>
              <button
                onClick={() => startGame()}
                className="btn btn-outline-light"
              >
                New Game
              </button>
            </div>
            {loadGame && (
              <div className="d-flex flex-column align-items-center">
                <h5 style={{ color: 'white', fontSize: 'smaller' }}>Loading</h5>
                <div>
                  <i
                    className="fa-solid fa-spinner fa-spin-pulse fa-2xl"
                    style={{ color: 'white' }}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!gameOver && (
        <>
          <div className="d-flex justify-content-center mt-3 container">
            <div className="d-flex flex-column align-items-center">
              <div>
                <h5 className="title">JEOPARDY</h5>
              </div>
              <button
                className="text-center btn btn-outline-light"
                onClick={() => startGame()}
              >
                RESTART
              </button>
              {loadGame && (
                <div className="d-flex flex-column align-items-center">
                  <h5 style={{ color: 'white' }}>Loading</h5>
                  <div>
                    <i
                      className="fa-solid fa-spinner fa-spin-pulse fa-2xl"
                      style={{ color: 'white' }}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="container-fluid table-container">
            <table className=" col-6">
              <tbody>
                {clues &&
                  clues.map((row: []) => (
                    <tr key={uuidv4()}>
                      {row.map((cell) => (
                        <Cell cell={cell} key={uuidv4()} />
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="clue-container">
            <ClueDiv gameOver={gameOver} setGameOver={setGameOver} />
          </div>
        </>
      )}
    </>
  );
};

export default Board;

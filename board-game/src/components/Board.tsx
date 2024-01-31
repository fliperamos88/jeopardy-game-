import Cell from './Cell';
import Head from './Head';
import ClueDiv from './ClueDiv';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, memo, useContext } from 'react';
import axios from 'axios';
import { ClueContext } from '../CellContext';

const Board = () => {
  const [clues, setClues] = useState<[][]>();

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
    id: string;
    game_id: number;
    value: number;
    daily_double: boolean;
    round: string;
    category: string;
    clue: string;
    response: string;
  };

  // const boardArr: Clue[][] = [];
  // for (let i = 0; i < 5; i++) {
  //   boardArr[i] = clues[i];
  //   for (let j = 0; j < 5; j++) {
  //     boardArr[i][j] = clues[j][i];
  //   }
  // }

  useEffect(() => {
    getClues();
  }, []);

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
      <div className="container table-container">
        <table className=" col-6">
          <thead>
            <tr>{/* <Head /> */}</tr>
          </thead>
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
        <ClueDiv />
      </div>
    </>
  );
};

export default memo(Board);

import { useState, useEffect, memo, useContext } from 'react';
import { ClueContext } from '../CellContext';

type CellProps = {
  cell: {
    id: string;
    game_id: number;
    value: number;
    daily_double: boolean;
    round: string;
    category: string;
    clue: string;
    response: string;
  };
};

const Cell = ({ cell }: CellProps) => {
  const clueContext = useContext(ClueContext);
  const [show, setShow] = useState<string | number>(cell.value);

  const changeClueDiv = (cellId: string) => {
    const clickedCell = document.getElementById(cellId);
    clickedCell?.classList.add('clue-clicked');
    clueContext?.setAnswer(true);
    clueContext?.setClue(cell);
  };

  return (
    <td
      key={cell.id}
      id={cell.id}
      onClick={() => changeClueDiv(cell.id)}
      className="cell-container"
      style={{
        pointerEvents: clueContext?.answer ? 'none' : 'all',
      }}
    >
      ${show}
    </td>
  );
};

export default memo(Cell);

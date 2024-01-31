import { useState, createContext, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

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

type ClueContextType = {
  clue: Clue | null;
  setClue: React.Dispatch<React.SetStateAction<Clue | null>>;
  answer: boolean;
  setAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  gameProgress: number;
  setGameProgress: React.Dispatch<React.SetStateAction<number>>;
};

type ClueContextProviderProps = {
  children: ReactNode;
};

const ClueContext = createContext<ClueContextType | null>(null);

const ClueContextProvider = ({ children }: ClueContextProviderProps) => {
  const [clue, setClue] = useState<Clue | null>(null);
  const [answer, setAnswer] = useState<boolean>(false);
  const [gameProgress, setGameProgress] = useState<number>(0);

  return (
    <ClueContext.Provider
      value={{
        clue,
        setClue,
        answer,
        setAnswer,
        gameProgress,
        setGameProgress,
      }}
    >
      {children}
    </ClueContext.Provider>
  );
};

export { ClueContext, ClueContextProvider };

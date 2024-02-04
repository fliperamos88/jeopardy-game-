import Board from './components/Board';
import { v4 as uuidv4 } from 'uuid';
import { ClueContext, ClueContextProvider } from './CellContext';

function App() {
  return (
    <div className="">
      <ClueContextProvider>
        <Board key={uuidv4()} />
      </ClueContextProvider>
    </div>
  );
}

export default App;

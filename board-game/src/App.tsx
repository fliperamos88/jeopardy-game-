import { Hello } from './components/Hello';
import Board from './components/Board';
import { v4 as uuidv4 } from 'uuid';
import { ClueContext, ClueContextProvider } from './CellContext';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <ClueContextProvider>
        {/* <Hello name="Felipe" /> */}
        <Board key={uuidv4()} />
      </ClueContextProvider>
    </div>
  );
}

export default App;

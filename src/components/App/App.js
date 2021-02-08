import Shell from '../Shell/Shell';
import { useShellGame } from './hooks'

function App() {
  const {
    reset,
    positions,
    check,
    openedShell,
    ballPosition,
    gameStarted,
  } = useShellGame();

  return (
    <>
      <button onClick={reset}>start</button>
      <div style={{ position: 'relative', width: '500px', height: '200px' }}>
        {positions[positions.length - 1].map((pos, index) => (
          <Shell
            key={index}
            index={index}
            pos={pos}
            check={check}
            openedShell={openedShell}
            ballPosition={ballPosition}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    </>
  );
}

App.displayName = 'App';

export default App;


import Shell from '../Shell/Shell';
import { useShellGame } from './hooks'

function App() {
  const {
    reset,
    positions,
    openShell,
    openedShell,
    ballPosition,
    gameStarted,
    setWinner,
    victories,
  } = useShellGame();

  let text = ''

  const winner = victories[victories.length - 1];
  if (!gameStarted && typeof winner === 'boolean') {
    text = `You ${winner === true ? 'win' : 'lose'}!!!`
  }

  return (
    <>
      <button onClick={reset}>start</button>
      {text}
      <div style={{ position: 'relative', width: '500px', height: '200px' }}>
        {positions[positions.length - 1].map((pos, index) => (
          <Shell
            key={index}
            index={index}
            pos={pos}
            openShell={openShell}
            openedShell={openedShell}
            ballPosition={ballPosition}
            gameStarted={gameStarted}
            setWinner={setWinner}
          />
        ))}
      </div>
    </>
  );
}

App.displayName = 'App';

export default App;


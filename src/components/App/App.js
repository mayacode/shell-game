import { useEffect, useState } from "react";

import Shell from '../Shell/Shell';

function App() {
  const positionsInitialState = [
    [
      {left: 150, top: 75},
      {left: 250, top: 75},
      {left: 350, top: 75},
    ]
  ];

  const [positions, setPositions] = useState(positionsInitialState);
  const [openedShell, setOpenedShell] = useState(-1);
  const [ballPosition, setBallPosition] = useState(-2);
  const [gameStarted, setGameStarted] = useState(false);

  function check(event) {
    const shellNr = parseInt(event.currentTarget.dataset.nr);

    setOpenedShell(shellNr)
  }

  function reset() {
    setOpenedShell(-1);
    setPositions(positionsInitialState);
    setBallPosition(getRandomNumber(3));
    setGameStarted(true);
  }

  const options = [
    [
      {left: 150, top: 75},
      {left: 250, top: 75},
      {left: 350, top: 75},
    ],
    [
      {left: 150, top: 75},
      {left: 350, top: 75},
      {left: 250, top: 75},
    ],
    [
      {left: 250, top: 75},
      {left: 150, top: 75},
      {left: 350, top: 75},
    ],
    [
      {left: 250, top: 75},
      {left: 350, top: 75},
      {left: 150, top: 75},
    ],
    [
      {left: 350, top: 75},
      {left: 150, top: 75},
      {left: 250, top: 75},
    ],
    [
      {left: 350, top: 75},
      {left: 250, top: 75},
      {left: 150, top: 75},
    ],
  ];

  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function makeChange() {
    const number = getRandomNumber(options.length)
    return options[number]
  }

  useEffect(
    () => {
      if(positions.length < 11 && gameStarted) {
        setTimeout(() => {
          const newPositions = [ ...positions];
          newPositions.push(makeChange());

          setPositions(newPositions);
        }, 500)
      } else {
        setGameStarted(false);
      }
    },
    [positions, gameStarted],
  );

  return (
    <>
      <button onClick={reset}>run</button>
      <div style={{ position: 'relative', width: '500px', height: '200px' }}>
        {positions[positions.length - 1].map((pos, index) => (
          <Shell key={index} index={index} pos={pos} check={check} openedShell={openedShell} ballPosition={ballPosition} gameStarted={gameStarted} />
        ))}
      </div>
    </>
  );
}

App.displayName = 'App';

export default App;


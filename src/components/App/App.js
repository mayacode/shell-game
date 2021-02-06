import { useEffect, useState } from "react";

import Shell from '../Shell/Shell';

function App() {
  const positionsInitialState = [
    [
      {left: 150, top: 75, key: 1},
      {left: 250, top: 75, key: 2},
      {left: 350, top: 75, key: 3},
    ]
  ];

  const [positions, setPositions] = useState(positionsInitialState);
  const [openedShell, setOpenedShell] = useState(0);

  function check(event) {
    const shellNr = parseInt(event.currentTarget.dataset.nr);

    setOpenedShell(shellNr)
  }

  function reset() {
    setOpenedShell(0);
    setPositions(positionsInitialState)
  }

  const options = [
    [
      {left: 150, top: 75, key: 1},
      {left: 250, top: 75, key: 2},
      {left: 350, top: 75, key: 3},
    ],
    [
      {left: 150, top: 75, key: 1},
      {left: 350, top: 75, key: 2},
      {left: 250, top: 75, key: 3},
    ],
    [
      {left: 250, top: 75, key: 1},
      {left: 150, top: 75, key: 2},
      {left: 350, top: 75, key: 3},
    ],
    [
      {left: 250, top: 75, key: 1},
      {left: 350, top: 75, key: 2},
      {left: 150, top: 75, key: 3},
    ],
    [
      {left: 350, top: 75, key: 1},
      {left: 150, top: 75, key: 2},
      {left: 250, top: 75, key: 3},
    ],
    [
      {left: 350, top: 75, key: 1},
      {left: 250, top: 75, key: 2},
      {left: 150, top: 75, key: 3},
    ],
  ]

  const options2 = [
    { modifyLeft: (v) => v + 4, modifyTop: (v) => v + 4 },
    { modifyLeft: (v) => v - 4, modifyTop: (v) => v - 4 },
    { modifyLeft: (v) => v + 4, modifyTop: (v) => v - 4 },
    { modifyLeft: (v) => v - 4, modifyTop: (v) => v + 4 },
  ]

  function getChange() {
    const number = Math.floor(Math.random() * Math.floor(6));
    return options[number]
  }

  useEffect(
    () => {
      if(positions.length < 11) {
        setTimeout(() => {
          const newPositions = [ ...positions];
          newPositions.push(getChange());

          setPositions(newPositions);
        }, 500)
      }
    },
    [positionsInitialState]
  )

  return (
    <>
      <button onClick={reset}>run</button>
      <div style={{ position: 'relative', width: '500px', height: '200px' }}>
        {positions[positions.length - 1].map((pos) => (
          <Shell key={pos.key} pos={pos} check={check} openedShell={openedShell} />
        ))}
      </div>
    </>
  );
}

App.displayName = 'App';

export default App;


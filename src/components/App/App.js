
import { useReducer } from "react";

function App() {
  const positionsInitialState = [
    {left: 0, top: 0},
    {left: 0, top: 0},
    {left: 0, top: 0},
  ];

  function reducer(state, action) {
    switch(action.type) {
      default:
        return state;
    }
  }

  const [positions, dispatch] = useReducer(reducer, positionsInitialState);
  return (
    <div style={{ display: 'flex',  }}>
      <div style={{ transform: 'rotate(45)' }}>
        <svg viewBox="0 0 55 55" style={{ width: '55px', height: '55px', padding: '5px' }}>
          <path d="M0,50 C0,0 50,0 50,50"></path>
        </svg>
      </div>
      <div>
        <svg viewBox="0 0 55 55" style={{ width: '55px', height: '55px', padding: '5px' }}>
          <path d="M0,50 C0,0 50,0 50,50"></path>
        </svg>
      </div>
      <div>
        <svg viewBox="0 0 55 55" style={{ width: '55px', height: '55px', padding: '5px' }}>
          <path d="M0,50 C0,0 50,0 50,50"></path>
        </svg>
      </div>
    </div>
  );
}

App.displayName = 'App';

export default App;


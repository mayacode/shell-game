import { useEffect, useState } from "react";

import Ball from './Ball';

export function Shell({ pos, check, openedShell, index, ballPosition, gameStarted }) {
  const [ballVisible, setBallVisible] = useState(openedShell && ballPosition === index);
  const style = {
    cursor: 'pointer',
    transition: 'all 0.5s ease 0s',
    position: 'absolute',
    zIndex: 10,
    transform: `rotate(${openedShell === index || (gameStarted && ballVisible) ? '45' : '0'}deg)`,
    width: '55px',
    height: '55px',
    ...pos
  };

  useEffect(
    () => {
      if (gameStarted && index === ballPosition) {
        setBallVisible(true);
        setTimeout(() => {
          setBallVisible(false);
        }, 1000)
      }
    },
    [gameStarted]
  );

  useEffect(
    () => {
      if(!gameStarted && openedShell === index && ballPosition === openedShell) {
        setBallVisible(true);
      }
    },
    [openedShell]
  );

  return (
    <div style={style}>
      <svg onClick={check} data-nr={index} viewBox="0 0 55 55">
        <path d="M0,50 C0,0 50,0 50,50"></path>
      </svg>
      {ballVisible && <Ball />}
    </div>
  )
}

export default Shell;

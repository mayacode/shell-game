import Ball from './Ball';
import { SHELL_TRANSITION_TIME } from '../../constants/constants';
import { useShell } from './hooks';

export function Shell({ pos, openShell, openedShell, index, ballPosition, gameStarted, setWinner }) {
  const { ballVisible, rotatedShell, checkShell } = useShell({
    ballPosition,
    gameStarted,
    index,
    openedShell,
    setWinner,
    openShell,
  });

  const style = {
    cursor: 'pointer',
    transition: `all ${SHELL_TRANSITION_TIME}s ease 0s`,
    position: 'absolute',
    zIndex: 10,
    transform: `rotate(${rotatedShell ? '45' : '0'}deg)`,
    width: '55px',
    height: '55px',
    ...pos
  };

  return (
    <div style={style} className="shell">
      <svg onClick={checkShell} data-nr={index} viewBox="0 0 55 55">
        <path d="M0,50 C0,0 50,0 50,50" />
      </svg>
      {ballVisible && <Ball />}
    </div>
  )
}

export default Shell;

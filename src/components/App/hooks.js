import { useEffect, useState } from 'react';
import {
  DEFAULT_BALL_POSITION,
  DEFAULT_OPENED_SHELL,
  MOVES_PER_GAME,
  SHELL_POSITION_CHANGE_TIMEOUT, SHELLS_NUMBER
} from '../../constants/constants';
import { options, getRandomNumber, makeChange } from './helpers';

/**
 * logic for shell game
 * @return {{ballPosition: number, reset: reset, positions: {top: number, left: number}[][], gameStarted: boolean, check: (function(Event): number), openedShell: number}}
 */
export function useShellGame() {
  const [positions, setPositions] = useState([options[0]]);
  const [openedShell, setOpenedShell] = useState(DEFAULT_OPENED_SHELL);
  const [ballPosition, setBallPosition] = useState(DEFAULT_BALL_POSITION);
  const [gameStarted, setGameStarted] = useState(false);

  /**
   * function for opening the clicked shell
   * @param {Event} event
   * @return {number} shellNr
   */
  function check(event) {
    if (!gameStarted) {
      const shellNr = parseInt(event.currentTarget.dataset.nr);

      setOpenedShell(shellNr)
    }
  }

  /**
   * function for resetting the game
   */
  function reset() {
    // there is no opened shell
    setOpenedShell(DEFAULT_OPENED_SHELL);
    // position default
    setPositions([options[0]]);
    // random ball position
    setBallPosition(getRandomNumber(SHELLS_NUMBER));
    // game started
    setGameStarted(true);
  }

  // every time when positions or gameStarted change
  useEffect(
    () => {
      // if positions length is less or equal to MOVES_PER_GAME
      // and game already started
      if(positions.length <= MOVES_PER_GAME && gameStarted) {
        // every SHELL_POSITION_CHANGE_TIMEOUT milliseconds
        setTimeout(() => {
          const newPositions = [ ...positions];
          newPositions.push(makeChange());

          // add new record into positions
          setPositions(newPositions);
        }, SHELL_POSITION_CHANGE_TIMEOUT)
      } else {
        // in other case game finished
        setGameStarted(false);
      }
    },
    [positions, gameStarted],
  );

  return {
    reset,
    positions,
    check,
    openedShell,
    ballPosition,
    gameStarted,
  }
}
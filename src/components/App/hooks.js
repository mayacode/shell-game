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
 * @return {{victories: *[], ballPosition: number, reset: reset, setWinner: setWinner, positions: {top: number, left: number}[][], openShell: openShell, gameStarted: boolean, openedShell: number}}
 */
export function useShellGame() {
  const [positions, setPositions] = useState([options[0]]);
  const [openedShell, setOpenedShell] = useState(DEFAULT_OPENED_SHELL);
  const [ballPosition, setBallPosition] = useState(DEFAULT_BALL_POSITION);
  const [gameStarted, setGameStarted] = useState(false);
  const [victories, setVictories] = useState([]);

  /**
   * function for opening the clicked shell
   * @param {number} shellNr
   * @return void
   */
  function openShell(shellNr) {
    setOpenedShell(shellNr)
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

    // set new victories record with default value null
    // this array could be used for counting victories for the user
    const newVictories = [...victories];
    newVictories.push(null);
    setVictories(newVictories);
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

  /**
   * function for setting a winner
   * @param {number} shellNr
   * @return void
   */
  function setWinner(shellNr) {
    // take last index in victories array
    const lastIndex = victories.length - 1;
    // only if winner was not set for this round
    if (victories[lastIndex] === null) {
      // make copy of victories array
      const newVictories = [...victories];

      // and add the result
      newVictories[lastIndex] = shellNr === ballPosition;

      setVictories(newVictories);
    }
  }

  return {
    reset,
    positions,
    openShell,
    openedShell,
    ballPosition,
    gameStarted,
    setWinner,
    victories,
  }
}
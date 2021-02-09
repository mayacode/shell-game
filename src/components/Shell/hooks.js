import {useEffect, useState} from "react";
import {DEFAULT_BALL_POSITION, DEFAULT_OPENED_SHELL} from "../../constants/constants";

/**
 * logic for the shell
 * @param {number} ballPosition position of the ball
 * @param {boolean} gameStarted
 * @param {number} index number of the shell
 * @param {number} openedShell number of shell which should be open
 * @param {function} setVictories
 * @param {function} openShell
 * @return {{rotatedShell: boolean, ballVisible: boolean}}
 */
export function useShell({
  ballPosition = DEFAULT_BALL_POSITION,
  gameStarted,
  index,
  openedShell = DEFAULT_OPENED_SHELL,
  setWinner,
  openShell,
} = {}) {
  const [ballVisible, setBallVisible] = useState(openedShell === index && ballPosition === index);

  // if game starts or finishes or ball position changes
  useEffect(
    () => {
      // if game started and this shell contains a ball
      if (gameStarted && index === ballPosition) {
        //show it
        setBallVisible(true);
        // for 1 second
        setTimeout(() => {
          setBallVisible(false);
        }, 1000)
      } else {
        // in other case hide the ball
        setBallVisible(false);
      }
    },
    [gameStarted, ballPosition],
  );

  // if openedShell changes
  useEffect(
    () => {
      // game finished and this shell is opened and contains the ball
      if(!gameStarted && openedShell === index && ballPosition === openedShell) {
        // show the ball
        setBallVisible(true);
      }
    },
    [openedShell],
  );

  /**
   * function which checks clicked shell
   * @param event
   */
  function checkShell(event) {
    // if movements finished
    if (!gameStarted) {
      // get clicked shell number
      const shellNr = parseInt(event.currentTarget.dataset.nr);

      // open it
      openShell(shellNr);
      // set win/lose status
      setWinner(shellNr)
    }
  }

  return {
    ballVisible,
    // show opened shell by rotating the image
    rotatedShell: openedShell === index || (!!gameStarted && ballVisible),
    checkShell,
  }
}
import { renderHook, act } from '@testing-library/react-hooks';

import { useShell } from '../hooks';
import {DEFAULT_OPENED_SHELL} from "../../../constants/constants";

describe('Shell hooks', () => {
  describe('useShell hook', () => {
    it('should return falsy values on defaults', () => {
      // by default all shells are empty and closed
      const { result } = renderHook(() => useShell());

      expect(result.current.ballVisible).toEqual(false);
      expect(result.current.rotatedShell).toEqual(false);
    });

    it('should react on changes coming to the hook', async () => {
      jest.useFakeTimers();

      // all data are default but index
      const initialProps = { index: 1 }
      const { result, rerender } = renderHook(
        (props) => useShell(props),
        { initialProps },
      );

      expect(result.current.ballVisible).toEqual(false);
      expect(result.current.rotatedShell).toEqual(false);

      // simulate end of the game and click of proper shell
      rerender({
        ...initialProps,
        openedShell: 1,
        gameStarted: false,
        ballPosition: 1,
      });

      expect(result.current.ballVisible).toEqual(true);
      expect(result.current.rotatedShell).toEqual(true);

      // simulate beginning of the game
      rerender({
        index: 2,
        gameStarted: true,
        ballPosition: 2,
      });

      // ball is visible only in the beginning
      expect(result.current.ballVisible).toEqual(true);
      expect(result.current.rotatedShell).toEqual(true);

      act(() => {
        jest.runAllTimers();
      });

      //after defined time (1 second) it disappears
      expect(result.current.ballVisible).toEqual(false);
    });

    it('checkShell', () => {
      const defaultIndex = 1;
      const setWinner = jest.fn();
      const openShell = jest.fn();
      const { result } = renderHook(() => useShell({
        ballPosition: defaultIndex,
        gameStarted: false,
        index: defaultIndex,
        openedShell: DEFAULT_OPENED_SHELL,
        setWinner,
        openShell,
      }));

      expect(setWinner).toHaveBeenCalledTimes(0);
      expect(openShell).toHaveBeenCalledTimes(0);
      expect(typeof result.current.checkShell).toEqual('function');

      act(() => {
        result.current.checkShell({ currentTarget: { dataset: { nr: `${defaultIndex}`}}});
      });

      expect(setWinner).toHaveBeenCalledTimes(1);
      expect(setWinner).toHaveBeenCalledWith(1);
      expect(openShell).toHaveBeenCalledTimes(1);
      expect(openShell).toHaveBeenCalledWith(1);
    });
  });
});

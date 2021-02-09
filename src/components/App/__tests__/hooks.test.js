import { renderHook, act } from '@testing-library/react-hooks';

import { useShellGame } from '../hooks';
import * as constants from '../../../constants/constants';

describe('Shell Game hooks', () => {
  describe('useShellGame hook', () => {
    it('should return openedShell and openShell function for manipulation', () => {
      const { result } = renderHook(() => useShellGame());

      expect(result.current.openedShell).toBeLessThan(0);
      expect(typeof result.current.openShell).toEqual('function');

      act(() => {
        result.current.openShell(1);
      });

      expect(result.current.openedShell).toEqual(1);
    });
    it('should return ballPosition and reset function for manipulation', () => {
      constants.MOVES_PER_GAME = 0;
      const { result } = renderHook(() => useShellGame());

      expect(result.current.ballPosition).toBeLessThan(0);
      expect(typeof result.current.reset).toEqual('function');

      act(() => {
        result.current.reset();
      });

      expect(result.current.ballPosition).toBeGreaterThanOrEqual(0);
    });
    it('should add new position if game started', async () => {
      constants.MOVES_PER_GAME = 1;
      const { result, waitForValueToChange } = renderHook(() => useShellGame());

      expect(result.current.positions).toHaveLength(1);

      act(() => {
        result.current.reset();
      });

      await waitForValueToChange(() => result.current.positions);

      expect(result.current.positions).toHaveLength(2);
    });

    it('should return victories and setWinner function for manipulation', () => {
      const { result } = renderHook(() => useShellGame());

      expect(result.current.victories).toEqual([]);
      expect(typeof result.current.setWinner).toEqual('function');

      act(() => {
        result.current.reset()
      })

      expect(result.current.victories).toEqual([null]);

      act(() => {
        result.current.setWinner(10)
      });

      expect(result.current.victories).toEqual([false]);

      act(() => {
        result.current.reset()
      })

      expect(result.current.victories).toEqual([false, null]);

      act(() => {
        result.current.setWinner(result.current.ballPosition)
      });

      expect(result.current.victories).toEqual([false, true]);
    });
  })
});

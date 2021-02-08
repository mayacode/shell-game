import { renderHook, act } from '@testing-library/react-hooks';

import { useShellGame } from '../hooks';
import * as constants from '../../../constants/constants';

describe('Shell Game hooks', () => {
  describe('useShellGame hook', () => {
    it('should return openedShell and check function for manipulation', () => {
      const { result } = renderHook(() => useShellGame());

      expect(result.current.openedShell).toBeLessThan(0);
      expect(typeof result.current.check).toEqual('function');

      act(() => {
        result.current.check({ currentTarget: { dataset: { nr: '1' }}});
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
  })
});

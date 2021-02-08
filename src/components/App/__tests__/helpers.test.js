import { getRandomNumber, makeChange } from '../helpers';

describe('Shell Game helpers', () => {
  describe('getRandomNumber function', () => {
    it('should return integer between 0 (inclusive) and max (exclusive of max)', () => {
      expect(getRandomNumber(1)).toEqual(0);
      expect(getRandomNumber(2)).toBeLessThan(2);
      expect(getRandomNumber(10)).toBeLessThan(10);
    });
  });

  describe('makeChange function', () => {
    it('should get one of existing options', () => {
      expect(makeChange()).toBeTruthy();
      expect(makeChange()).toBeTruthy();
      expect(makeChange()).toBeTruthy();
    })
  });
});

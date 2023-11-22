import addThreePoints from './addThreePoints';
import { expect, test, describe } from 'vitest';

describe('addThreePoints', () => {
  test('Should handle correct value with normal values', () => {
    const result = addThreePoints('Lorem ipsum', 5);
    expect(result).toBe('Lorem...');
  });
});

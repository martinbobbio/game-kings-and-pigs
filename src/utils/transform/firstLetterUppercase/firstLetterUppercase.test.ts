import firstLetterUppercase from './firstLetterUppercase';
import { expect, test, describe } from 'vitest';

describe('firstLetterUppercase', () => {
  test('Should handle first letter uppercase correctly', () => {
    const result = firstLetterUppercase('Lorem ipsum');
    expect(result).toBe('Lorem ipsum');
  });
});

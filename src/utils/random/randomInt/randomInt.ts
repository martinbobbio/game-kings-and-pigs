/**
 * Function that returns a random number
 *
 * @param min for the min number
 * @param max for the max number
 * @return number
 */
export default (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

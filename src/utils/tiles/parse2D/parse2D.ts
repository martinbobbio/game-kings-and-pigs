/**
 * Function that returns a parsed tiles in two dimension
 *
 * @param array for parse its in two dimensions
 * @return array
 */
export default (array: number[], amount: number): number[][] => {
  const parsed2D = [];
  for (let i = 0; i < array.length; i += amount) {
    parsed2D.push(array.slice(i, i + amount));
  }
  return parsed2D;
};

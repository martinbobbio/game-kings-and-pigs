/**
 * Function that parse an address like Ethereum Ropst...
 *
 * @param value for the parse
 * @param characters for characters
 * @return string
 */
export default (value: string | undefined, characters: number): string => {
  if (!value) return '';
  if (value.length < characters) return value;
  else return `${value.substring(0, characters)}...`;
};

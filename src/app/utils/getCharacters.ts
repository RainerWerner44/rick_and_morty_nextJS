export const getCharacters = (array: string[]) => {
  const numbers = array.map((item) => item.split("character/").slice(1, 2));

  return numbers.flat(1).map(Number);
};

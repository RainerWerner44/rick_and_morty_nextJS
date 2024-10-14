export const getDataNumbersArray = (count: number) => {
  const newArray = [];

  for (let i = 0; i < count; i++) {
    newArray.push(i + 1);
  }

  return newArray;
};
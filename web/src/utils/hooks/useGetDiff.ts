// for get difference between 2 strings

export const getDifference = (a: string, b: string) => {
  let i = 0;
  let j = 0;
  let result = "";

  while (j < b.length) {
    if (a[i] !== b[j] || i === a.length) result += b[j];
    else i += 1;
    j += 1;
  }
  return result;
};

export const removeSpacesFromInput = (inp: string) => {
  return inp.replace(/\s*/g, '');
};

export const convertSpecialChar = (inp: string) => {
  return `${inp
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\\/g, '\\/')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\*/g, '\\*')}`;
};

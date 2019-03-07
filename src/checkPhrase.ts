export const checkInput = (inp: string) => {
  checkParenthesses(inp);
  checkChar(inp, '.');
  checkChar(inp, '/');
  checkChar(inp, '*');
};

const checkParenthesses = (inp: string) => {
  const nOfOpenningParenhesses = numberOfChar(inp, '\\(');
  const nOfClosingParenthesses = numberOfChar(inp, '\\)');
  if (nOfClosingParenthesses !== nOfOpenningParenhesses) {
    throw new Error('number of opening and closing parenthesses are not equal');
  }
};
const numberOfChar = (inp: string, char: string) => {
  const regExString = new RegExp(`${char}`, 'g');
  const res = inp.match(regExString);
  return res ? res.length : 0;
};
const checkUseMoreThanOne = (inp: string, char: string) => {
  const regExString = new RegExp(`\\${char}{2,}`, 'g');
  const res = inp.match(regExString);
  return res ? res.length : 0;
};
const checkChar = (inp: string, operator: string) => {
  if (checkUseMoreThanOne(inp, operator) > 0) {
    throw new Error(`the ${operator} is used more than one in one place`);
  }
};

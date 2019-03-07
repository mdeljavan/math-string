import { checkInput } from './checkPhrase';
import { solveBetweenParantheses, solveMathPhrases } from './solveModules';

const solve = (input: string) => {
  checkInput(input);
  let result = solveBetweenParantheses(input);
  result = solveMathPhrases(result);
  return +result > 0 ? result.replace('+', '') : result;
};

export default solve;

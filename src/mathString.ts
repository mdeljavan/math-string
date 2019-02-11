import { solveBetweenParantheses, solveMathPhrases } from './solveModules';

const solve = (input: string) => {
  let result = solveBetweenParantheses(input);
  result = solveMathPhrases(result);
  return +result > 0 ? result.replace('+', '') : result;
};

export default solve;

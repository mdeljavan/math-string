import { solveBetweenParantheses, solveMathPhrases } from './solveModules';

const solve = (input: string) => {
  let result = solveBetweenParantheses(input);
  result = solveMathPhrases(result);
  return result;
};

export default solve;

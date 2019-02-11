import {
  betweenParenthesesRegExp,
  divisionRegExp,
  multiplicationRegExp,
  numberRegExp,
  summationOrSubtractionRegExp
} from './regulaExpersions';
import { removeSpacesFromInput } from './utility';

export const selectNumbers = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(numberRegExp);
};
export const selectParantheses = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(betweenParenthesesRegExp);
};
export const selectMultiplicationPhrase = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(multiplicationRegExp);
};
export const selectDivisionPharse = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(divisionRegExp);
};
export const selectSummationOrSubtractionPhrase = (input: string) => {
  return input.match(summationOrSubtractionRegExp);
};

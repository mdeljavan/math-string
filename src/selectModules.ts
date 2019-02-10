import { removeSpacesFromInput } from "./utility";
import {
  numberRegExp,
  betweenParenthesesRegExp,
  multiplicationOrDivisionRegExp,
  summationOrSubtractionRegExp
} from "./regulaExpersions";

export const selectNumbers = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(numberRegExp);
};
export const selectParantheses = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(betweenParenthesesRegExp);
};
export const selectMultiplicationOrDivisionePhrase = (input: string) => {
  const inp = removeSpacesFromInput(input);
  return inp.match(multiplicationOrDivisionRegExp);
};
export const selectSummationOrSubtractionPhrase = (input: string) => {
  return input.match(summationOrSubtractionRegExp);
};

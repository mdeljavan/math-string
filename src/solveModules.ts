import {
  selectParantheses,
  selectMultiplicationOrDivisionePhrase,
  selectSummationOrSubtractionPhrase,
  selectNumbers
} from "./selectModules";
import { mathSigns } from "./regulaExpersions";
import { converSpecialChar } from "./utility";

export const solveBetweenParantheses = (input: string): string => {
  let result: string = input;
  let betweenParantes = selectParantheses(result);
  if (!betweenParantes) {
    return result;
  }
  betweenParantes.forEach(inp => {
    const resultPhrase = solveMathPhrases(inp);
    result = result.replace(inp, resultPhrase);
  });
  return solveBetweenParantheses(result);
};
export const solveMathPhrases = (phrase: string) => {
  let result: string = solveMultiplicationOrDivisionPhrase(phrase);
  result = solveSummationOrSubtractionPhrase(result);
  result = result.replace(/[()]/g, "");
  return result;
};
export const solveMultiplicationOrDivisionPhrase = (phrase: string): string => {
  const multiplicationOrDivisionPhrase = selectMultiplicationOrDivisionePhrase(
    phrase
  );
  if (!multiplicationOrDivisionPhrase) return phrase;
  multiplicationOrDivisionPhrase.forEach(phr => {
    const _result = solveMultiplicationOrDivision(phr);
    phrase = phrase.replace(phr, _result);
  });
  return solveMultiplicationOrDivisionPhrase(phrase);
};
export const solveSummationOrSubtractionPhrase = (phrase: string): string => {
  phrase = phrase.replace(/(\-\+)|(\+\-)/g, "-").replace(/(\+\+)|(\-\-)/g, "+");
  const summationOrSubtractionPhrase = selectSummationOrSubtractionPhrase(
    phrase
  );
  if (!summationOrSubtractionPhrase) {
    return phrase;
  }
  summationOrSubtractionPhrase.forEach(phr => {
    const _result = solveSummationOrSubtraction(phr);
    phrase = phrase.replace(phr, _result);
  });
  return solveSummationOrSubtractionPhrase(phrase);
};
export const solveMultiplicationOrDivision = (phrase: string) => {
  const numbers = selectNumbers(phrase)!;
  const num1 = numbers[0];
  const num2 = numbers[1];
  const result = phrase.includes(mathSigns.multiplication)
    ? +num1 * +num2
    : +num1 / +num2;
  return result >= 0 ? `+${result.toString()}` : result.toString();
};
export const solveSummationOrSubtraction = (phrase: string) => {
  const numbers = selectNumbers(phrase)!;
  const num1 = numbers[0];
  const num2 = numbers[1];
  const mathOperator = phrase.replace(
    new RegExp(`(${converSpecialChar(num1)}|${converSpecialChar(num2)})`, "g"),
    ""
  );
  const result =
    mathOperator && mathOperator == mathSigns.subtraction
      ? +num1 - +num2
      : +num1 + +num2;
  return result >= 0 ? `+${result.toString()}` : result.toString();
};

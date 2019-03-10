import { mathSigns } from './regulaExpersions';
import {
  selectDivisionPharse,
  selectMultiplicationPhrase,
  selectNumbers,
  selectParantheses,
  selectSummationOrSubtractionPhrase
} from './selectModules';
import { convertSpecialChar } from './utility';

export const solveBetweenParantheses = (input: string): string => {
  let result: string = input;
  const betweenParantes = selectParantheses(result);
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
  let result = solveSevralPositiveAndNegativeSings(phrase);
  result = solveDivisionPharse(phrase);
  result = solveMultiplicationPhrase(result);
  result = solveSummationOrSubtractionPhrase(result);
  result = result.replace(/[()]/g, '');
  return result;
};
export const solveDivisionPharse = (phrase: string): string => {
  const divisionPhrase = selectDivisionPharse(phrase);
  if (!divisionPhrase) {
    return phrase;
  }
  divisionPhrase.forEach(phr => {
    const _result = convertDivisionToMultiplication(phr);
    phrase = phrase.replace(phr, _result);
  });
  return solveDivisionPharse(phrase);
};
export const convertDivisionToMultiplication = (phrase: string): string => {
  const _result = 1 / +selectNumbers(phrase)![0];
  return `*${_result}`;
};
export const solveMultiplicationPhrase = (phrase: string): string => {
  const multiplicationOrDivisionPhrase = selectMultiplicationPhrase(phrase);
  if (!multiplicationOrDivisionPhrase) {
    return phrase;
  }
  multiplicationOrDivisionPhrase.forEach(phr => {
    const _result = solveMultiplication(phr);
    phrase = phrase.replace(phr, _result);
  });
  return solveMultiplicationPhrase(phrase);
};
export const solveSummationOrSubtractionPhrase = (phrase: string): string => {
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
export const solveMultiplication = (phrase: string) => {
  const numbers = selectNumbers(phrase)!;
  const num1 = numbers[0];
  const num2 = numbers[1];
  const result = +num1 * +num2;
  return result >= 0 ? `+${result.toString()}` : result.toString();
};
export const solveSummationOrSubtraction = (phrase: string) => {
  const numbers = selectNumbers(phrase)!;
  const num1 = numbers[0];
  const num2 = numbers[1];
  const mathOperator = phrase.replace(
    new RegExp(
      `(${convertSpecialChar(num1)}|${convertSpecialChar(num2)})`,
      'g'
    ),
    ''
  );
  const result =
    mathOperator == mathSigns.subtraction ? +num1 - +num2 : +num1 + +num2;
  return result >= 0 ? `+${result.toString()}` : result.toString();
};
export const solveSevralPositiveAndNegativeSings = (phrase: string): string => {
  const regExpPosNeg = /(\-\+)|(\+\-)/g;
  const regExpPosPosOrNegNeg = /(\+\+)|(\-\-)/g;
  if (regExpPosNeg.test(phrase)) {
    phrase.match(regExpPosNeg)!.forEach(phr => {
      phrase = phrase.replace(phr, '-');
    });
    return solveSevralPositiveAndNegativeSings(phrase);
  }
  if (regExpPosPosOrNegNeg.test(phrase)) {
    phrase.match(regExpPosPosOrNegNeg)!.forEach(phr => {
      phrase = phrase.replace(phr, '+');
    });
    return solveSevralPositiveAndNegativeSings(phrase);
  }
  return phrase;
};

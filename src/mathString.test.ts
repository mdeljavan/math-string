import { checkInput } from './checkPhrase';
import solve from './mathString';
import { selectNumbers, selectParantheses } from './selectModules';
import {
  solveDivisionPharse,
  solveMathPhrases,
  solveMultiplication,
  solvePowerPhrase,
  solveSevralPositiveAndNegativeSings,
  solveSummationOrSubtractionPhrase
} from './solveModules';
const inputsAndResults = {
  selectNumbers: [['1+11+       +9-11e23', ['1', '+11', '+9', '-11e23']]],
  selectParentheses: [
    [
      '+(1+1)+(111+(1111)-111)*(1*1/2/5-1+1)',
      ['(1+1)', '(1111)', '(1*1/2/5-1+1)'],
    ],
  ],
  solvePositivesAndNegatives: [
    ['1-+-+--+2', '1+2'],
    ['1+++2----3--+-+4', '1+2+3-4'],
  ],
  solveMultiplicationPhrase: [['3*3', '+9'], ['3*-3', '-9']],
  solveDivisionPhrase: [
    ['4/2', '4*0.5'],
    ['4/-2', '4*-0.5'],
    ['4/2/2', '4*0.5*0.5'],
  ],
  solveSummationOrSubtractionPhrase: [
    ['1+2', '+3'],
    ['1-2', '-1'],
    ['-1-2', '-3'],
    ['-1+2', '+1'],
  ],
  solvePowerPhrase: [['1^2', '+1'], ['2^-1', '+0.5']],
  solve: [
    ['1+2-4*2+4/2', '-3'],
    ['1+2-(4*2)+4/2', '-3'],
    ['-1+3*((4+4*(3+4))+(3*(-1)*-2)/4)+3-5', '97.5'],
    ['1*2/4*6+4*3', '15'],
    ['1+2^3+2^(4^2+7)', '8388617'],
    ['2^(2^5)', '4294967296'],
  ],
};
const faultInput = [
  '1**1*1***2',
  '1//3/3/////4',
  '1....2+1.2+1...2',
  '1+(2+2+2+3+(3)',
];
describe('detect fault input and throw error', () => {
  test.each(faultInput)('throw an error', (phr: string) => {
    expect(() => checkInput(phr)).toThrow();
  });
});
describe('test select number RegExp ', () => {
  test.each(inputsAndResults.selectNumbers)(
    'test select number for %s',
    (phr: string, expected: string) => {
      expect(selectNumbers(phr)).toEqual(expected);
    }
  );
});
describe('select phrase between parentheses', () => {
  test.each(inputsAndResults.selectParentheses)('%s', (phr, expected) => {
    expect(selectParantheses(phr)).toEqual(expected);
  });
});
describe('conver division to multiplication', () => {
  test.each(inputsAndResults.solveDivisionPhrase)('%s', (phr, expected) => {
    expect(solveDivisionPharse(phr)).toEqual(expected);
  });
});
describe('solve a phrase', () => {
  test.each(inputsAndResults.solve)('%s', (phr, expected) => {
    expect(solve(phr)).toEqual(expected);
  });
});
describe('solve a multiplication phrase', () => {
  test.each(inputsAndResults.solveMultiplicationPhrase)(
    '%s',
    (phr, expected) => {
      expect(solveMultiplication(phr)).toEqual(expected);
    }
  );
});
describe('resolve several positive and negative signs', () => {
  test.each(inputsAndResults.solvePositivesAndNegatives)(
    '%s',
    (phr, expected) => {
      expect(solveSevralPositiveAndNegativeSings(phr)).toEqual(expected);
    }
  );
});
describe('solve a power phrase', () => {
  test.each(inputsAndResults.solvePowerPhrase)('%s', (phr, expected) => {
    expect(solvePowerPhrase(phr)).toEqual(expected);
  });
});
describe('solve a summation or subtraction phrase', () => {
  test.each(inputsAndResults.solveSummationOrSubtractionPhrase)(
    '%s',
    (phr, expected) => {
      expect(solveSummationOrSubtractionPhrase(phr)).toEqual(expected);
    }
  );
});

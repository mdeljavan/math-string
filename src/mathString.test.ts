import solve from './mathString';
import {
  selectMultiplicationPhrase,
  selectNumbers,
  selectParantheses
} from './selectModules';
import {
  solveDivisionPharse,
  solveMathPhrases,
  solveMultiplication
} from './solveModules';
const operator = ['+', '-', '*', '/'];
const input: string[] = [
  '1+11+       +9-11e23',
  '+(1+1)+(111+(1111)-111)*(1*1/2/5-1+1)',
  '3*3',
  '3*-3',
  '4/2',
  '1+2-4*2+4/2',
  '1+2-(4*2)+4/2',
  '-1+3*((4+4*(3+4))+(3*(-1)*-2)/4)+3-5',
  '1*2/4*6+4*3'
];

xdescribe('test Regex for inputs', () => {
  it('select numbers', () => {
    expect(selectNumbers(input[0])).toEqual(['1', '+11', '+9', '-11e23']);
  });
  it('select parantesses and numbers between them', () => {
    expect(selectParantheses(input[1])).toEqual([
      '(1+1)',
      '(1111)',
      '(1*1/2/5-1+1)'
    ]);
  });
  it('select multiple or divide two numbers', () => {
    expect(selectMultiplicationPhrase(input[1])).toEqual(['1*1', '2/5']);
  });
});
describe('solve phrases math', () => {
  xit('solve multiplication and return possitive', () => {
    expect(solveMultiplication(input[2])).toBe('+9');
  });
  xit('solve multiplication and return negative', () => {
    expect(solveMultiplication(input[3])).toBe('-9');
  });
  xit('solve division', () => {
    expect(solveDivisionPharse(input[4])).toBe('*2');
  });
  xit('solve a phrase without parantheses', () => {
    expect(solveMathPhrases(input[5])).toBe('-3');
  });
  it('solve a phrase with parantheses', () => {
    expect(solve(input[7])).toBe('+97.5');
    expect(solve(input[8])).toBe('+15');
    expect(solve(input[5])).toBe('-3');
    expect(solve(input[4])).toBe('+2');
  });
});

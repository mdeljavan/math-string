import { checkInput } from './checkPhrase';
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
const faultInput = [
  '1**1*1***2',
  '1//3/3/////4',
  '1....2+1.2+1...2',
  '1+(2+2+2+3+(3)'
];
describe('test Regex for inputs', () => {
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
    expect(selectMultiplicationPhrase(input[1])).toEqual(['1*1']);
  });
});
describe('solve phrases math', () => {
  it('solve multiplication and return possitive', () => {
    expect(solveMultiplication(input[2])).toBe('+9');
  });
  it('solve multiplication and return negative', () => {
    expect(solveMultiplication(input[3])).toBe('-9');
  });
  it('solve division', () => {
    expect(solveDivisionPharse(input[4])).toBe('4*0.5');
  });
  it('solve a phrase without parantheses', () => {
    expect(solveMathPhrases(input[5])).toBe('-3');
  });
  it('solve a phrase with parantheses', () => {
    expect(solve(input[7])).toBe('97.5');
    expect(solve(input[8])).toBe('15');
    expect(solve(input[5])).toBe('-3');
    expect(solve(input[4])).toBe('2');
  });
});
describe('detect fault input', () => {
  it('throw error if use more than one * operator in one place', () => {
    expect(() => {
      checkInput(faultInput[0]);
    }).toThrow();
  });
  it('throw error if use more than one / operator in one place', () => {
    expect(() => {
      checkInput(faultInput[1]);
    }).toThrow();
  });
  it('throw error if use more than one . in one place', () => {
    expect(() => {
      checkInput(faultInput[2]);
    }).toThrow();
  });
  it('throw error if use not equal parenthesses', () => {
    expect(() => {
      checkInput(faultInput[3]);
    }).toThrow();
  });
});

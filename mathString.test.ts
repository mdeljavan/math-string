import MathString from './mathString';
const operator = ['+', '-', '*', '/'];
let input: string[] = [
  '1+11+      9-11e23',
  '+(1+1)+(111+(1111)-111)*(1*1/2/5-1+1)',
  '3*3',
  '3*-3',
  '4/2',
  '1+2-4*2+4/2',
  '1+2-(4*2)+4/2',
  '-1+3*((4+4*(3+4))+(3*(-1)*-2)/4)+3-5',
  '1*2/4*6+4*3'
];

describe('test Regex for inputs', () => {
  const mathString = new MathString()
  it('select numbers', () => {
    expect(mathString.selectNumbers(input[0])).toEqual(['1', '+11', '+9', '-11e23'])
  })
  it('select parantesses and numbers between them', () => {
    expect(mathString.selectParantheses(input[1])).toEqual(['(1+1)', '(1111)', '(1*1/2/5-1+1)'])
  })
  it('select multiple or divide two numbers', () => {
    expect(mathString.selectMultiplicationOrDivisionePhrase(input[1])).toEqual(['1*1', '2/5'])
  })
})
describe('solve phrases math', () => {
  const mathString = new MathString()
  it('solve multiplication and return possitive', () => {
    expect(mathString.solveMultiplicationOrDivision(input[2])).toBe('+9')
  })
  it('solve multiplication and return negative', () => {
    expect(mathString.solveMultiplicationOrDivision(input[3])).toBe('-9')
  })
  it('solve division', () => {
    expect(mathString.solveMultiplicationOrDivision(input[4])).toBe('+2')
  })
  it('solve a phrase without parantheses', () => {
    expect(mathString.solveMathPhrases(input[5])).toBe('-3')
  })
  it('solve a phrase with parantheses', () => {
    expect(mathString.solve(input[7])).toBe('+97.5')
    expect(mathString.solve(input[8])).toBe('+15')
  })
})
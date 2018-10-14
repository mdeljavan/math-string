import MathString from './mathString';
const operator = ['+', '-', '*', '/'];
let input: string[] = ['1+11+      111-11e23', '+(1+1)+(111+(1111)-111)*(1*1/2/5-1+1)'];

describe('test Regex for inputs', () => {
    const mathString = new MathString(input[0])
    it ('select numbers', () => {
      expect(mathString.selectNumbers()).toEqual(['1' , '11','111','11e23'])  
    })
    it('select parantesses and numbers between them', () => {
      expect(mathString.selectParanteses()).toEqual(['(1+1)','(1111)','(1*1/2/5-1+1)'])
    })
    it('select multiple or divide two numbers', () => {
      expect(mathString.selectMultipleOrDivideNumbers()).toEqual(['1*1','2/5'])
    })
})
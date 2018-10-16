class MathStrign {
  numRegString: string = '[+-]?\\d*\\.?\\d+(e[+-]?\\d+)?';
  numberRegExp: RegExp = new RegExp(`${this.numRegString}`, 'g');
  betweenParenthesesRegExp: RegExp = new RegExp(
    `\\([+-]?${this.numRegString}([\\+\\-\\*\\/]${this.numRegString})*\\)`,
    'g'
  );
  multiplicationOrDivisionRegExp: RegExp = new RegExp(
    `${this.numRegString}[\\*\\/]${this.numRegString}`,
    'g'
  );
  summationOrSubtractionRegExp: RegExp = new RegExp(
    `${this.numRegString}[\\+\\-]${this.numRegString}`,
    'g'
  );
  mathSigns = {
    multiplication: '*',
    divisin: '\\',
    summation: '+',
    subtraction: '-'
  };
  constructor(public input: string) {
    this.input = input.replace(/\s*/g, '');
  }
  selectNumbers = (input: string) => {
    return input.replace(/\s*/g,'').match(this.numberRegExp);
  };
  selectParantheses = (input: string) => {
    return input.replace(/\s*/g,'').match(this.betweenParenthesesRegExp);
  };
  selectMultiplicationOrDivisionePhrase = (input: string) => {
    return input.replace(/\s*/g,'').match(this.multiplicationOrDivisionRegExp);
  };
  selectSummationOrSubtractionPhrase = (input: string) => {
    return input.replace(/\s*/,'').match(this.summationOrSubtractionRegExp);
  };
  solveBetweenParantheses = (input: string): string => {
    let betweenParantes = this.selectParantheses(input);
    let result: string = input;
    if (!betweenParantes) {
      return result;
    }
    betweenParantes.forEach(inp => {
     const resultPhrase = this.solveMathPhrases(inp);
     result = input.replace(new RegExp(`${inp}`), resultPhrase)
    });
    return this.solveBetweenParantheses(result)
  };
  solveMathPhrases = (phrase: string) => {
    let result: string = phrase;
    const multiplicationOrDivisionPhrase = this.selectMultiplicationOrDivisionePhrase(
      result
    );
    if (multiplicationOrDivisionPhrase) {
      multiplicationOrDivisionPhrase.forEach(phr => {
        const _result = this.solveMultiplicationOrDivision(phr);
        result = phrase.replace(new RegExp(`${phr}`), _result);
      });
    }
    const summationOrSubtractionPhrase = this.selectSummationOrSubtractionPhrase(result)
    if (summationOrSubtractionPhrase) {
      summationOrSubtractionPhrase.forEach(phr => {
        const _result = this.solveSummationOrSubtraction(phr)
        result = phrase.replace(new RegExp(`${phr}`), _result)
      })
    }
    result = result.replace(/[()]/,'');
    return result
  };
  solveMultiplicationOrDivision = (phrase: string) => {
    const numbers = this.selectNumbers(phrase)!;
    const num1 = numbers[0];
    const num2 = numbers[1];
    const result = phrase.includes(this.mathSigns.multiplication)
      ? +num1 * +num2
      : +num1 / +num2;

    return result >= 0 ? `+${result.toString()}` : result.toString();
  };
  solveSummationOrSubtraction = (phrase: string) => {
    const numbers = this.selectNumbers(phrase)!
    const num1 = numbers[0]
    const num2 = numbers[1]
    const result = phrase.includes(this.mathSigns.summation) ? +num1 + +num2 : +num1 - +num2
    return result >= 0 ? `+${result.toString()}` : result.toString()
  }
  solve = () => {
    let result = this.input;
    result = this.solveBetweenParantheses(result);
    result = this.solveMathPhrases(result);
    return result;
  };
}
export default MathStrign;

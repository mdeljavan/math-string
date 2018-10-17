class MathStrign {
  mathSigns = {
    multiplication: '*',
    divisin: '/',
    summation: '+',
    subtraction: '-'
  };
  numRegString: string = '[+-]?\\d*\\.?\\d+(?:e[+-]?\\d+)?';
  numberRegExp: RegExp = new RegExp(`${this.numRegString}`, 'g');
  betweenParenthesesRegExp: RegExp = new RegExp(
    `\\(${this.numRegString}(?:[\\${this.mathSigns.summation}\\${this.mathSigns.subtraction}\\${this.mathSigns.multiplication}\\${this.mathSigns.divisin}]${this.numRegString})*\\)`,
    'g'
  );
  multiplicationOrDivisionRegExp: RegExp = new RegExp(
    `${this.numRegString}[\\${this.mathSigns.multiplication}\\${this.mathSigns.divisin}]${this.numRegString}`
    );
  summationOrSubtractionRegExp: RegExp = new RegExp(
    `${this.numRegString}[\\${this.mathSigns.summation}\\${this.mathSigns.subtraction}]${this.numRegString}`,
    'g'
  );
  selectNumbers = (input: string) => {
    return input.match(this.numberRegExp);
  };
  selectParantheses = (input: string) => {
    return input.match(this.betweenParenthesesRegExp);
  };
  selectMultiplicationOrDivisionePhrase = (input: string) => {
    return input.match(this.multiplicationOrDivisionRegExp);
  };
  selectSummationOrSubtractionPhrase = (input: string) => {
    return input.match(this.summationOrSubtractionRegExp);
  };
  converSpecialChar = (inp: string) => {
   return `${inp
    .replace(/\(/g,'\\(')
    .replace(/\)/g,'\\)')
    .replace(/\\/g, '\\/')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\*/g, '\\*')}`
  }
  solveBetweenParantheses = (input: string): string => {
    let result: string = input;
    let betweenParantes = this.selectParantheses(result);
    if (!betweenParantes) {
      return result;
    }
    betweenParantes.forEach(inp => {
      const resultPhrase = this.solveMathPhrases(inp);
      result = result.replace(inp, resultPhrase)
    });
    return this.solveBetweenParantheses(result)
  };
  solveMathPhrases = (phrase: string) => {
    let result: string = this.solveMultiplicationOrDivisionPhrase(phrase)
    result = this.solveSummationOrSubtractionPhrase(result);
    result = result.replace(/[()]/g, '');
    return result
  };
  solveMultiplicationOrDivisionPhrase = (phrase: string): string => {
    const multiplicationOrDivisionPhrase = this.selectMultiplicationOrDivisionePhrase(
      phrase
    );
    if (!multiplicationOrDivisionPhrase) return phrase
    multiplicationOrDivisionPhrase.forEach(phr => {
      const _result = this.solveMultiplicationOrDivision(phr);
      phrase = phrase.replace(phr, _result);
    });
    return this.solveMultiplicationOrDivisionPhrase(phrase)
  }
  solveSummationOrSubtractionPhrase = (phrase: string): string => {
    phrase = phrase.replace(/(\-\+)|(\+\-)/g,'-').replace(/(\+\+)|(\-\-)/g,'+');
    const summationOrSubtractionPhrase = this.selectSummationOrSubtractionPhrase(phrase)
    if (!summationOrSubtractionPhrase) {
      return phrase 
    }
    summationOrSubtractionPhrase.forEach(phr => {
      const _result = this.solveSummationOrSubtraction(phr)
      phrase = phrase.replace(phr, _result)
    })
    return this.solveSummationOrSubtractionPhrase(phrase)
}
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
  const numbers = this.selectNumbers(phrase)!;
  const num1 = numbers[0]
  const num2 = numbers[1]
  const mathOperator = phrase.replace(new RegExp(`(?:${this.converSpecialChar(num1)}|${this.converSpecialChar(num2)})`,'g'),'')
  const result = (mathOperator && mathOperator == this.mathSigns.subtraction) ? +num1 - +num2 : +num1 + +num2
  return result >= 0 ? `+${result.toString()}` : result.toString()
}
 solve = (input: string) => { 
  let result = input.replace(/\s*/g, '');
  result = this.solveBetweenParantheses(result);
  result = this.solveMathPhrases(result);
  return result;
};
}
export default MathStrign;

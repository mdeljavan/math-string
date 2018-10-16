class MathStrign {
  numRegString: string = '[+-]?\\d*\\.?\\d+(e[+-]?\\d+)?';
  numberRegExp: RegExp = new RegExp(`${this.numRegString}`, 'g');
  betweenParenthesesRegExp: RegExp = new RegExp(
    `\\([+-]?${this.numRegString}([\\+\\-\\*\\/]${this.numRegString})*\\)`,
    'g'
  );
  multiplicationOrDivisionRegExp:RegExp = new RegExp(`${this.numRegString}[\\*\\/]${this.numRegString}`,'g');
  sumOrSubtractionRegExp: RegExp = new RegExp(`${this.numRegString}[\\+\\-]${this.numRegString}`,'g');
  mathSigns = {
    multipication: '*',
    divisin: '/',
    summation: '+',
    subtraction: '-'
  }
  constructor(public input: string) {
    this.input = input.replace(/\s*/g, '');
  }
  selectNumbers = (input: string) => {
    return input.match(this.numberRegExp);
  };
  selectParantheses = (input: string) => {
    return input.match(this.betweenParenthesesRegExp)
  }
  selectMultipicationOrDivisionePhrase = (input: string) => {
    return input.match(this.multiplicationOrDivisionRegExp)
  }
  solveBetweenParantheses = (input: string) => {
    let betweenParantes = this.selectParantheses(input);
    if (!betweenParantes ){
      return input;
    }
    betweenParantes.forEach(inp => {
      this.solveMathPhrases(inp.replace(/[()]/g, ''))
    })
    return input
  }
  solveMathPhrases = (phrase: string) => {
    const multipicationOrDivisionPhrase = this.selectMultipicationOrDivisionePhrase(phrase);
    if (multipicationOrDivisionPhrase) {
      multipicationOrDivisionPhrase.forEach(phr => {
        const result = this.solveMultipicationOrDivision(phr);
        phrase = phrase.replace(new RegExp(`${phr}`), result)
      })
    }
  }
  solveMultipicationOrDivision = (phrase: string) => {
    const multipication = phrase.split(this.mathSigns.multipication) 
    return input
  }
  solveSummationOrSubtraction = (input: string) => {

    return input;
  }
  solve = () => {
    let result = this.input;
    result = this.solveBetweenParantheses(result);
    result = this.solveMultipicationOrDivision(result);
    result = this.solveSummationOrSubtraction(result);
    return result
  };
}
export default MathStrign;

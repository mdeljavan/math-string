class MathStrign {
  numRegString: string = '[+-]?\\d*\\.?\\d+(e[+-]?\\d+)?';
  numberRegExp: RegExp = new RegExp(`${this.numRegString}`, 'g');
  betweenParenthesesRegExp: RegExp = new RegExp(
    `\\([+-]?${this.numRegString}([\\+\\-\\*\\/]${this.numRegString})*\\)`,
    'g'
  );
  multiplicationOrDivisionRegExp:RegExp = new RegExp(`${this.numRegString}[\\*\\/]${this.numRegString}`,'g');
  sumOrSubtractionRegExp: RegExp = new RegExp(`${this.numRegString}[\\+\\-]${this.numRegString}`,'g')
  constructor(public input: string) {
    this.input = input.replace(/\s*/g, '');
  }
  selectNumbers = (input: string) => {
    return input.match(this.numberRegExp);
  };
  selectParantheses = (input: string) => {
    return input.match(this.betweenParenthesesRegExp)
  }
  selectMultipleOrDivideNumbers = (input: string) => {
    console.log(this.multiplicationOrDivisionRegExp)
    return input.match(this.multiplicationOrDivisionRegExp)
  }
  solveBetweenParantheses = (input: string) => {
    let betweenParantes = this.selectParantheses(input);
    if (!betweenParantes ){
      return input;
    }
    betweenParantes.forEach(inp => {
      if (inp.length > 4 ){
          this.solveBetweenParantheses(inp)
      } else {
        
      }
    })
    return input
  }
  solveMultipicationOrDivision = (input: string) => {
    
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

export const mathSigns = {
  multiplication: '*',
  divisin: '/',
  summation: '+',
  subtraction: '-'
};
const numRegString: string = '[+-]?\\d*\\.?\\d+(e[+-]?\\d+)?';
export const numberRegExp: RegExp = new RegExp(`${numRegString}`, 'g');
export const betweenParenthesesRegExp: RegExp = new RegExp(
  `\\(${numRegString}([\\${mathSigns.summation}\\${mathSigns.subtraction}\\${
    mathSigns.multiplication
  }\\${mathSigns.divisin}]${numRegString})*\\)`,
  'g'
);
export const divisionRegExp: RegExp = new RegExp(
  `\\${mathSigns.divisin}${numRegString}`,
  'g'
);
export const multiplicationRegExp: RegExp = new RegExp(
  `${numRegString}\\${mathSigns.multiplication}${numRegString}`,
  'g'
);
export const summationOrSubtractionRegExp: RegExp = new RegExp(
  `${numRegString}[\\${mathSigns.summation}\\${
    mathSigns.subtraction
  }]${numRegString}`,
  'g'
);

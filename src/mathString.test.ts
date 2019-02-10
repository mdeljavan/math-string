import solve from "./mathString";
import {
  selectNumbers,
  selectParantheses,
  selectMultiplicationOrDivisionePhrase
} from "./selectModules";
import {
  solveMultiplicationOrDivision,
  solveMathPhrases
} from "./solveModules";
const operator = ["+", "-", "*", "/"];
let input: string[] = [
  "1+11+       +9-11e23",
  "+(1+1)+(111+(1111)-111)*(1*1/2/5-1+1)",
  "3*3",
  "3*-3",
  "4/2",
  "1+2-4*2+4/2",
  "1+2-(4*2)+4/2",
  "-1+3*((4+4*(3+4))+(3*(-1)*-2)/4)+3-5",
  "1*2/4*6+4*3"
];

describe("test Regex for inputs", () => {
  it("select numbers", () => {
    expect(selectNumbers(input[0])).toEqual(["1", "+11", "+9", "-11e23"]);
  });
  it("select parantesses and numbers between them", () => {
    expect(selectParantheses(input[1])).toEqual([
      "(1+1)",
      "(1111)",
      "(1*1/2/5-1+1)"
    ]);
  });
  it("select multiple or divide two numbers", () => {
    expect(selectMultiplicationOrDivisionePhrase(input[1])).toEqual([
      "1*1",
      "2/5"
    ]);
  });
});
xdescribe("solve phrases math", () => {
  it("solve multiplication and return possitive", () => {
    expect(solveMultiplicationOrDivision(input[2])).toBe("+9");
  });
  it("solve multiplication and return negative", () => {
    expect(solveMultiplicationOrDivision(input[3])).toBe("-9");
  });
  it("solve division", () => {
    expect(solveMultiplicationOrDivision(input[4])).toBe("+2");
  });
  it("solve a phrase without parantheses", () => {
    expect(solveMathPhrases(input[5])).toBe("-3");
  });
  it("solve a phrase with parantheses", () => {
    expect(solve(input[7])).toBe("+97.5");
    expect(solve(input[8])).toBe("+15");
  });
});

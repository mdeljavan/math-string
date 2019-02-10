export const removeSpacesFromInput = (inp: string) => {
  return inp.replace(/\s*/g, "");
};

export const converSpecialChar = (inp: string) => {
  return `${inp
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\\/g, "\\/")
    .replace(/\+/g, "\\+")
    .replace(/\-/g, "\\-")
    .replace(/\*/g, "\\*")}`;
};

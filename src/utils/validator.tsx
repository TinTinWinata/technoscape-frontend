export const numberOnly = (input: string): string => {
  const validated = input.match(/\d+/);
  if (validated) {
    return validated[0];
  }
  return '';
};

export const isExists = (any: string) =>
  any !== undefined && any !== null && any !== '';

export const isNumber = (input: string) => {
  // Convert the input string to a number using the unary plus (+) operator
  const numberValue = +input;

  // Check if the result of the conversion is a valid number
  return !isNaN(numberValue);
};

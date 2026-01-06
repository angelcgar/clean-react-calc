/**
 * Suma dos números
 */
export const add = (a: number, b: number): number => {
  return a + b;
};

/**
 * Resta dos números
 */
export const subtract = (a: number, b: number): number => {
  return a - b;
};

/**
 * Multiplica dos números
 */
export const multiply = (a: number, b: number): number => {
  return a * b;
};

/**
 * Divide dos números
 * Retorna NaN si el divisor es cero
 */
export const divide = (a: number, b: number): number => {
  if (b === 0) return NaN;
  return a / b;
};

/**
 * Ejecuta una operación entre dos números
 */
export const compute = (
  a: number,
  b: number,
  operator: "+" | "-" | "*" | "/"
): number => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return b;
  }
};

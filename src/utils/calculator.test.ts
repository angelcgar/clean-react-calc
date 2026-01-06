import { describe, it, expect } from "vitest";
import { add, subtract, multiply, divide, compute } from "./calculator";

describe("Calculator", () => {
  describe("add", () => {
    it("adds two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    it("adds positive and negative numbers", () => {
      expect(add(5, -3)).toBe(2);
    });

    it("adds two negative numbers", () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it("adds decimals correctly", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe("subtract", () => {
    it("subtracts two positive numbers", () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it("subtracts resulting in negative", () => {
      expect(subtract(3, 5)).toBe(-2);
    });

    it("subtracts negative numbers", () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    it("subtracts decimals correctly", () => {
      expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe("multiply", () => {
    it("multiplies two positive numbers", () => {
      expect(multiply(4, 5)).toBe(20);
    });

    it("multiplies by zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it("multiplies negative numbers", () => {
      expect(multiply(-3, 4)).toBe(-12);
      expect(multiply(-3, -4)).toBe(12);
    });

    it("multiplies decimals correctly", () => {
      expect(multiply(2.5, 4)).toBe(10);
    });
  });

  describe("divide", () => {
    it("divides two positive numbers", () => {
      expect(divide(10, 2)).toBe(5);
    });

    it("divides resulting in decimal", () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    it("divides negative numbers", () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(10, -2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });

    it("returns NaN when dividing by zero", () => {
      expect(divide(5, 0)).toBeNaN();
      expect(divide(0, 0)).toBeNaN();
      expect(divide(-10, 0)).toBeNaN();
    });

    it("divides zero by non-zero number", () => {
      expect(divide(0, 5)).toBe(0);
    });
  });

  describe("compute", () => {
    it("computes addition", () => {
      expect(compute(5, 3, "+")).toBe(8);
    });

    it("computes subtraction", () => {
      expect(compute(10, 4, "-")).toBe(6);
    });

    it("computes multiplication", () => {
      expect(compute(6, 7, "*")).toBe(42);
    });

    it("computes division", () => {
      expect(compute(15, 3, "/")).toBe(5);
    });

    it("returns NaN for division by zero", () => {
      expect(compute(10, 0, "/")).toBeNaN();
    });

    it("handles complex operations correctly", () => {
      expect(compute(100, 25, "-")).toBe(75);
      expect(compute(12.5, 2.5, "*")).toBe(31.25);
    });
  });
});

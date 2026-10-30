import { describe, expect, it } from "vitest";
import { Matrix } from "./Matrix";

describe("Matrix", () => {
  describe("constructor", () => {
    it("creates a matrix when dimensions match the data", () => {
      const data = [
        [1, 2],
        [3, 4],
      ];

      const matrix = new Matrix(2, 2, data);

      expect(matrix.rows).toBe(2);
      expect(matrix.cols).toBe(2);
      expect(matrix.data).toBe(data);
    });

    it.each([
      [0, 1],
      [-1, 1],
      [1, 0],
      [1, -1],
    ])("rejects non-positive dimensions %i x %i", (rows, cols) => {
      expect(() => new Matrix(rows, cols, [[1]])).toThrow(
        "Matrix dimensions must be positive integers.",
      );
    });

    it("rejects data whose row count does not match the dimensions", () => {
      expect(() => new Matrix(2, 1, [[1]])).toThrow(
        "Data dimensions do not match specified rows and columns.",
      );
    });

    it("rejects data whose column count does not match the dimensions", () => {
      expect(() => new Matrix(1, 2, [[1]])).toThrow(
        "Data dimensions do not match specified rows and columns.",
      );
    });
  });

  describe("add", () => {
    it("adds a scalar to every element without changing the original matrix", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);

      const result = matrix.add(5);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [6, 7],
        [8, 9],
      ]);
      expect(matrix.data).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("adds two matrices element by element", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(2, 2, [
        [5, 6],
        [7, 8],
      ]);

      const result = matrix.add(other);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [6, 8],
        [10, 12],
      ]);
    });

    it("rejects matrices with different dimensions", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(1, 2, [[5, 6]]);

      expect(() => matrix.add(other)).toThrow(
        "Matrix dimensions must match for addition.",
      );
    });
  });

  describe("subtract", () => {
    it("subtracts a scalar from every element without changing the original matrix", () => {
      const matrix = new Matrix(2, 2, [
        [5, 7],
        [9, 11],
      ]);

      const result = matrix.subtract(2);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [3, 5],
        [7, 9],
      ]);
      expect(matrix.data).toEqual([
        [5, 7],
        [9, 11],
      ]);
    });

    it("subtracts two matrices element by element", () => {
      const matrix = new Matrix(2, 2, [
        [5, 8],
        [3, 1],
      ]);
      const other = new Matrix(2, 2, [
        [2, 1],
        [4, 0],
      ]);

      const result = matrix.subtract(other);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [3, 7],
        [-1, 1],
      ]);
    });

    it("rejects matrices with different dimensions", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(1, 2, [[5, 6]]);

      expect(() => matrix.subtract(other)).toThrow(
        "Matrix dimensions must match for subtraction.",
      );
    });
  });

  describe("multiply", () => {
    it("multiplies every element by a scalar without changing the original matrix", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);

      const result = matrix.multiply(3);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [3, 6],
        [9, 12],
      ]);
      expect(matrix.data).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("multiplies two matrices element by element", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(2, 2, [
        [2, 0],
        [1, 2],
      ]);

      const result = matrix.multiply(other);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [2, 0],
        [3, 8],
      ]);
    });

    it("rejects matrices with different dimensions", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(1, 2, [[5, 6]]);

      expect(() => matrix.multiply(other)).toThrow(
        "Matrix dimensions must match for multiplication.",
      );
    });
  });

  describe("divide", () => {
    it("divides every element by a scalar without changing the original matrix", () => {
      const matrix = new Matrix(2, 2, [
        [6, 8],
        [10, 12],
      ]);

      const result = matrix.divide(2);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [3, 4],
        [5, 6],
      ]);
      expect(matrix.data).toEqual([
        [6, 8],
        [10, 12],
      ]);
    });

    it("divides two matrices element by element", () => {
      const matrix = new Matrix(2, 2, [
        [10, 20],
        [30, 40],
      ]);
      const other = new Matrix(2, 2, [
        [2, 5],
        [3, 8],
      ]);

      const result = matrix.divide(other);

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([
        [5, 4],
        [10, 5],
      ]);
    });

    it("rejects matrices with different dimensions", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(1, 2, [[5, 6]]);

      expect(() => matrix.divide(other)).toThrow(
        "Matrix dimensions must match for division.",
      );
    });

    it("throws an error on division by zero", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      const other = new Matrix(2, 2, [
        [1, 0],
        [3, 2],
      ]);

      expect(() => matrix.divide(other)).toThrow(
        "Division by zero encountered in matrix division.",
      );
    });
  });

  describe("transpose", () => {
    it("transposes a square matrix without changing the original matrix", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);

      const result = matrix.transpose();

      expect(result).toBeInstanceOf(Matrix);
      expect(result.rows).toBe(2);
      expect(result.cols).toBe(2);
      expect(result.data).toEqual([
        [1, 3],
        [2, 4],
      ]);
      expect(matrix.data).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("transposes a rectangular matrix (swaps rows and columns)", () => {
      const matrix = new Matrix(2, 3, [
        [1, 2, 3],
        [4, 5, 6],
      ]);

      const result = matrix.transpose();

      expect(result).toBeInstanceOf(Matrix);
      expect(result.rows).toBe(3);
      expect(result.cols).toBe(2);
      expect(result.data).toEqual([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });
  });

  describe("determinant", () => {
    it("calculates determinant of a 1x1 matrix", () => {
      const matrix = new Matrix(1, 1, [[5]]);
      expect(matrix.determinant()).toBe(5);
    });

    it("calculates determinant of a 2x2 matrix", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [3, 4],
      ]);
      expect(matrix.determinant()).toBe(-2);
    });

    it("calculates determinant of a 3x3 matrix", () => {
      const matrix = new Matrix(3, 3, [
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ]);
      expect(matrix.determinant()).toBe(1);
    });

    it("rejects determinant calculation for non-square matrices", () => {
      const matrix = new Matrix(2, 3, [
        [1, 2, 3],
        [4, 5, 6],
      ]);

      expect(() => matrix.determinant()).toThrow(
        "Determinant can only be calculated for square matrices.",
      );
    });

    it("rejects determinant calculation for matrices larger than 3x3", () => {
      const matrix = new Matrix(4, 4, [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]);

      expect(() => matrix.determinant()).toThrow(
        "Determinant calculation for matrices larger than 3x3 is not implemented.",
      );
    });
  });

  describe("inverse", () => {
    it("calculates inverse of a 1x1 matrix without changing the original", () => {
      const matrix = new Matrix(1, 1, [[4]]);
      const result = matrix.inverse();

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data).toEqual([[0.25]]);
      expect(matrix.data).toEqual([[4]]);
    });

    it("calculates inverse of a 2x2 matrix", () => {
      const matrix = new Matrix(2, 2, [
        [4, 7],
        [2, 6],
      ]);

      const result = matrix.inverse();

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data[0][0]).toBeCloseTo(0.6);
      expect(result.data[0][1]).toBeCloseTo(-0.7);
      expect(result.data[1][0]).toBeCloseTo(-0.2);
      expect(result.data[1][1]).toBeCloseTo(0.4);
    });

    it("calculates inverse of a 3x3 matrix", () => {
      const matrix = new Matrix(3, 3, [
        [1, 0, 2],
        [0, 1, 0],
        [1, 2, 1],
      ]);

      const result = matrix.inverse();

      expect(result).toBeInstanceOf(Matrix);
      expect(result.data[0][0]).toBeCloseTo(-1);
      expect(result.data[0][1]).toBeCloseTo(-4);
      expect(result.data[0][2]).toBeCloseTo(2);
      expect(result.data[1][0]).toBeCloseTo(0);
      expect(result.data[1][1]).toBeCloseTo(1);
      expect(result.data[1][2]).toBeCloseTo(0);
      expect(result.data[2][0]).toBeCloseTo(1);
      expect(result.data[2][1]).toBeCloseTo(2);
      expect(result.data[2][2]).toBeCloseTo(-1);
    });

    it("rejects inverse for non-square matrices", () => {
      const matrix = new Matrix(2, 3, [
        [1, 2, 3],
        [4, 5, 6],
      ]);

      expect(() => matrix.inverse()).toThrow(
        "Inverse can only be calculated for square matrices.",
      );
    });

    it("rejects inverse for singular matrices (determinant is 0)", () => {
      const matrix = new Matrix(2, 2, [
        [1, 2],
        [2, 4],
      ]);

      expect(() => matrix.inverse()).toThrow(
        "Matrix is singular and cannot be inverted.",
      );
    });

    it("rejects inverse for 1x1 zero matrix", () => {
      const matrix = new Matrix(1, 1, [[0]]);

      expect(() => matrix.inverse()).toThrow(
        "Matrix is singular and cannot be inverted.",
      );
    });

    it("rejects inverse for matrices larger than 3x3", () => {
      const matrix = new Matrix(4, 4, [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]);

      expect(() => matrix.inverse()).toThrow(
        "Inverse calculation for matrices larger than 3x3 is not implemented.",
      );
    });
  });
});

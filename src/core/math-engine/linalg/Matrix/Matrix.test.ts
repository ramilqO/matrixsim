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
});
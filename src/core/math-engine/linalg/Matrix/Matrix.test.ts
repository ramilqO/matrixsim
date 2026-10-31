import { describe, expect, it } from "vitest";
import { Matrix } from "./Matrix";

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

  it("multiplies two matrices using dot product (row x column)", () => {
    const a = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const b = new Matrix(3, 2, [
      [7, 8],
      [9, 1],
      [2, 3],
    ]);

    const result = a.multiply(b);

    expect(result).toBeInstanceOf(Matrix);
    expect(result.rows).toBe(2);
    expect(result.cols).toBe(2);
    expect(result.data).toEqual([
      [31, 19],
      [85, 55],
    ]);
  });

  it("rejects matrix multiplication if inner dimensions do not match", () => {
    const a = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    const b = new Matrix(1, 2, [[5, 6]]);

    expect(() => a.multiply(b)).toThrow(
      "Columns of the first matrix must match rows of the second matrix for multiplication.",
    );
  });
});

export interface IMatrix {
  rows: number;
  cols: number;
  data: number[][];

  /**
   * Adds another matrix (element-wise) or a scalar to this matrix.
   * @param other The matrix or scalar to add.
   * @returns A new matrix with the result.
   */
  add(other: IMatrix | number): IMatrix;

  /**
   * Subtracts another matrix (element-wise) or a scalar from this matrix.
   * @param other The matrix or scalar to subtract.
   * @returns A new matrix with the result.
   */
  subtract(other: IMatrix | number): IMatrix;

  /**
   * Performs matrix multiplication (dot product) with another matrix,
   * or scales the matrix by a scalar.
   * @param other Matrix to multiply by (inner dimensions must match), or a scalar.
   * @returns A new result matrix.
   */
  multiply(other: IMatrix | number): IMatrix;

  /**
   * Divides the matrix elements by a scalar or another matrix (element-wise).
   * @param other The divisor matrix or scalar.
   * @returns A new matrix with the result.
   */
  divide(other: IMatrix | number): IMatrix;

  /**
   * Transposes the matrix (swaps rows and columns).
   * @returns A new transposed matrix.
   */
  transpose(): IMatrix;

  /**
   * Calculates the determinant of a square matrix (up to 3x3).
   * @returns Determinant value.
   */
  determinant(): number;

  /**
   * Computes the inverse of a square non-singular matrix (up to 3x3).
   * @returns A new inverted matrix.
   */
  inverse(): IMatrix;
}

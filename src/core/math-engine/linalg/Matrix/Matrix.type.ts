export interface IMatrix {
  rows: number;
  cols: number;
  data: number[][];

  /**
   * Performs an operation with another matrix or scalar.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @param other - The matrix or scalar to perform the operation with
   * @returns The result matrix after performing the operation with the other matrix or scalar.
   *
   */
  add(other: IMatrix | number): IMatrix;

  /**
   * Performs a subtraction operation with another matrix or scalar.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @param other - The matrix or scalar to perform the operation with
   * @returns The result matrix after performing the operation with the other matrix or scalar.
   *
   */
  subtract(other: IMatrix | number): IMatrix;

  /**
   * Performs a multiplication operation with another matrix or scalar.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @param other - The matrix or scalar to perform the operation with
   * @returns The result matrix after performing the operation with the other matrix or scalar.
   *
   */
  multiply(other: IMatrix | number): IMatrix;

  /**
   * Performs a division operation with another matrix or scalar.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @param other - The matrix or scalar to perform the operation with
   * @returns The result matrix after performing the operation with the other matrix or scalar.
   *
   */
  divide(other: IMatrix | number): IMatrix;

  /**
   * Transposes the matrix.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @returns The transposed matrix.
   *
   */
  transpose(): IMatrix;

  /**
   * Calculates the determinant of the matrix.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @returns The determinant of the matrix.
   *
   */
  determinant(): number;

  /**
   * Calculates the inverse of the matrix.
   *
   * @remarks
   * This method is part of the {@link core/linalg | Matrix}.
   *
   * @returns The inverse matrix.
   *
   */
  inverse(): IMatrix;
}

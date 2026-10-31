export interface IVector {
  size: number;
  data: number[];

  /**
   * Adds another vector (element-wise) or a scalar to this vector.
   * @param other The vector or scalar to add.
   * @returns A new vector with the result.
   */
  add(other: IVector | number): IVector;

  /**
   * Subtracts another vector (element-wise) or a scalar from this vector.
   * @param other The vector or scalar to subtract.
   * @returns A new vector with the result.
   */
  subtract(other: IVector | number): IVector;

  /**
   * Performs dot product with another vector, or scales the vector by a scalar.
   * @param other Vector to multiply by (must be of the same size), or a scalar.
   * @returns A new result vector.
   */
  multiply(other: IVector | number): IVector;

  /**
   * Divides the vector elements by a scalar or another vector (element-wise).
   * @param other The divisor vector or scalar.
   * @returns A new vector with the result.
   */
  divide(other: IVector | number): IVector;

  /**
   * Computes the magnitude (length) of the vector.
   * @returns The magnitude of the vector.
   */
  magnitude(): number;

  /**
   * Normalizes the vector (scales it to have a magnitude of 1).
   * @returns A new normalized vector.
   */
  normalize(): IVector;

  /**
   * Computes the dot product with another vector.
   * @param other The other vector (must be of the same size).
   * @returns The dot product result.
   */
  dot(other: IVector): number;

  /**
   * Computes the cross product with another vector (only for 3D vectors).
   * @param other The other vector (must be of size 3).
   * @returns A new vector representing the cross product.
   */
  cross(other: IVector): IVector;
}

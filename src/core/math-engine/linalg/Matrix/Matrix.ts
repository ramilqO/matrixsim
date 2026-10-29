import { IMatrix } from "./Matrix.type";

/**
 * The service for mathematical calculations on matrices.
 *
 * @remarks
 * This class is part of the `math-engine` core
 */
export class Matrix implements IMatrix {
  constructor(
    public rows: number,
    public cols: number,
    public data: number[][],
  ) {
    if (rows <= 0 || cols <= 0) {
      throw new Error("Matrix dimensions must be positive integers.");
    }

    if (data.length !== rows || data.some((row) => row.length !== cols)) {
      throw new Error(
        "Data dimensions do not match specified rows and columns.",
      );
    }
  }

  add(other: IMatrix | number): IMatrix {
    // Implementation for adding matrices or a scalar
    return new Matrix(this.rows, this.cols, this.data);
  }

  subtract(other: IMatrix | number): IMatrix {
    // Implementation for subtracting matrices or a scalar
    return new Matrix(this.rows, this.cols, this.data);
  }

  multiply(other: IMatrix | number): IMatrix {
    // Implementation for multiplying matrices or a scalar
    return new Matrix(this.rows, this.cols, this.data);
  }

  divide(other: IMatrix | number): IMatrix {
    // Implementation for dividing matrices or a scalar
    return new Matrix(this.rows, this.cols, this.data);
  }

  transpose(): IMatrix {
    // Implementation for transposing the matrix
    return new Matrix(this.cols, this.rows, this.data);
  }

  determinant(): number {
    // Implementation for calculating the determinant
    return 0;
  }
  inverse(): IMatrix {
    return new Matrix(this.rows, this.cols, this.data);
  }
}

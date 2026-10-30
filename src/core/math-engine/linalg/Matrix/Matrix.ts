import { IMatrix } from "./Matrix.type";

export class Matrix implements IMatrix {
  constructor(
    public rows: number,
    public cols: number,
    public data: number[][],
  ) {
    if (rows <= 0 || cols <= 0) {
      throw new Error("Matrix dimensions must be positive integers.");
    }

    if (!(rows && cols && data)) {
      throw new Error("Invalid matrix dimensions or data.");
    }

    if (data.length !== rows || data.some((row) => row.length !== cols)) {
      throw new Error(
        "Data dimensions do not match specified rows and columns.",
      );
    }
  }

  add(other: IMatrix | number): IMatrix {
    const resultData: number[][] = [];

    if (typeof other === "number") {
      this.data.forEach((row, i) => {
        resultData.push([]);
        row.forEach((element) => {
          resultData[i].push(element + other);
        });
      });

      return new Matrix(this.rows, this.cols, resultData);
    }

    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for addition.");
    }

    this.data.forEach((row, i) => {
      resultData.push([]);
      row.forEach((element, j) => {
        resultData[i].push(element + other.data[i][j]);
      });
    });

    return new Matrix(this.rows, this.cols, resultData);
  }

  subtract(other: IMatrix | number): IMatrix {
    const resultData: number[][] = [];

    if (typeof other === "number") {
      this.data.forEach((row, i) => {
        resultData.push([]);

        row.forEach((element) => {
          resultData[i].push(element - other);
        });
      });

      return new Matrix(this.rows, this.cols, resultData);
    }

    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for subtraction.");
    }

    this.data.forEach((row, i) => {
      resultData.push([]);

      row.forEach((element, j) => {
        resultData[i].push(element - other.data[i][j]);
      });
    });

    return new Matrix(this.rows, this.cols, resultData);
  }

  multiply(other: IMatrix | number): IMatrix {
    const resultData: number[][] = [];

    if (typeof other === "number") {
      this.data.forEach((row, i) => {
        resultData.push([]);

        row.forEach((element) => {
          resultData[i].push(element * other);
        });
      });

      return new Matrix(this.rows, this.cols, resultData);
    }

    // Добавлена проверка размеров
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for multiplication.");
    }

    this.data.forEach((row, i) => {
      resultData.push([]);

      row.forEach((element, j) => {
        resultData[i].push(element * other.data[i][j]);
      });
    });

    return new Matrix(this.rows, this.cols, resultData);
  }

  divide(other: IMatrix | number): IMatrix {
    const resultData: number[][] = [];

    if (typeof other === "number") {
      this.data.forEach((row, i) => {
        resultData.push([]);

        row.forEach((element) => {
          resultData[i].push(element / other);
        });
      });

      return new Matrix(this.rows, this.cols, resultData);
    }

    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for division.");
    }

    this.data.forEach((row, i) => {
      resultData.push([]);

      row.forEach((element, j) => {
        if (other.data[i][j] === 0) {
          throw new Error("Division by zero encountered in matrix division.");
        }

        resultData[i].push(element / other.data[i][j]);
      });
    });

    return new Matrix(this.rows, this.cols, resultData);
  }

  transpose(): IMatrix {
    const resultData: number[][] = [];

    for (let i = 0; i < this.cols; i++) {
      resultData.push([]);
      for (let j = 0; j < this.rows; j++) {
        resultData[i].push(this.data[j][i]);
      }
    }

    return new Matrix(this.cols, this.rows, resultData);
  }

  determinant(): number {
    const n = this.rows;
    const m = this.cols;

    if (n !== m) {
      throw new Error(
        "Determinant can only be calculated for square matrices.",
      );
    }

    if (n === 1) {
      return this.data[0][0];
    }

    if (n === 2) {
      return (
        this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
      );
    }

    if (n === 3) {
      return (
        this.data[0][0] * this.data[1][1] * this.data[2][2] +
        this.data[0][1] * this.data[1][2] * this.data[2][0] +
        this.data[0][2] * this.data[1][0] * this.data[2][1] -
        this.data[0][2] * this.data[1][1] * this.data[2][0] -
        this.data[0][1] * this.data[1][0] * this.data[2][2] -
        this.data[0][0] * this.data[1][2] * this.data[2][1]
      );
    }

    if (n > 3) {
      throw new Error(
        "Determinant calculation for matrices larger than 3x3 is not implemented.",
      );
    }

    return 0;
  }

  inverse(): IMatrix {
    const n = this.rows;

    if (n !== this.cols) {
      throw new Error("Inverse can only be calculated for square matrices.");
    }

    if (n > 3) {
      throw new Error(
        "Inverse calculation for matrices larger than 3x3 is not implemented.",
      );
    }

    if (n === 1) {
      if (this.data[0][0] === 0) {
        throw new Error("Matrix is singular and cannot be inverted.");
      }
      return new Matrix(1, 1, [[1 / this.data[0][0]]]);
    }

    const det = this.determinant();
    if (det === 0) {
      throw new Error("Matrix is singular and cannot be inverted.");
    }

    const invDet = 1 / det;
    const a = this.data;

    if (n === 2) {
      return new Matrix(2, 2, [
        [a[1][1] * invDet, -a[0][1] * invDet],
        [-a[1][0] * invDet, a[0][0] * invDet],
      ]);
    }

    if (n === 3) {
      return new Matrix(3, 3, [
        [
          (a[1][1] * a[2][2] - a[1][2] * a[2][1]) * invDet,
          (a[0][2] * a[2][1] - a[0][1] * a[2][2]) * invDet,
          (a[0][1] * a[1][2] - a[0][2] * a[1][1]) * invDet,
        ],
        [
          (a[1][2] * a[2][0] - a[1][0] * a[2][2]) * invDet,
          (a[0][0] * a[2][2] - a[0][2] * a[2][0]) * invDet,
          (a[0][2] * a[1][0] - a[0][0] * a[1][2]) * invDet,
        ],
        [
          (a[1][0] * a[2][1] - a[1][1] * a[2][0]) * invDet,
          (a[0][1] * a[2][0] - a[0][0] * a[2][1]) * invDet,
          (a[0][0] * a[1][1] - a[0][1] * a[1][0]) * invDet,
        ],
      ]);
    }

    throw new Error(
      "Inverse calculation for matrices larger than 3x3 is not implemented.",
    );
  }
}

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


    return new Matrix(this.rows, this.cols, this.data);
  }

  divide(other: IMatrix | number): IMatrix {
    // Временная заглушка, возвращающая копию текущей матрицы
    return new Matrix(this.rows, this.cols, this.data);
  }

  transpose(): IMatrix {
    // Временная заглушка, возвращающая копию текущей матрицы
    return new Matrix(this.rows, this.cols, this.data);
  }

  determinant(): number {
    // Временная заглушка для скалярного значения
    return 0;
  }

  inverse(): IMatrix {
    // Временная заглушка, возвращающая копию текущей матрицы
    return new Matrix(this.rows, this.cols, this.data);
  }
}

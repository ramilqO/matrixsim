export interface IMatrix {
  rows: number;
  cols: number;
  data: number[][];
  
  add(other: IMatrix | number): IMatrix;
  subtract(other: IMatrix | number): IMatrix;
  multiply(other: IMatrix | number): IMatrix;
  divide(other: IMatrix | number): IMatrix;

  transpose(): IMatrix;
  determinant(): number;
  inverse(): IMatrix;
}

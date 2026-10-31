import { IVector } from "./Vector.type";

export class Vector implements IVector {
  constructor(
    public size: number,
    public data: number[],
  ) {
    if (size <= 0) {
      throw new Error("Vector size must be a positive integer.");
    }

    if (!data || data.length !== size) {
      throw new Error("Data length does not match specified size.");
    }
  }

  add(other: IVector | number): IVector {
    const resultData: number[] = [];

    if (typeof other === "number") {
      this.data.forEach((element) => {
        resultData.push(element + other);
      });

      return new Vector(this.size, resultData);
    }

    if (this.size !== other.size) {
      throw new Error("Vector sizes must match for addition.");
    }

    this.data.forEach((element, i) => {
      resultData.push(element + other.data[i]);
    });

    return new Vector(this.size, resultData);
  }

  subtract(other: IVector | number): IVector {
    const resultData: number[] = [];

    if (typeof other === "number") {
      this.data.forEach((element) => {
        resultData.push(element - other);
      });

      return new Vector(this.size, resultData);
    }

    if (this.size !== other.size) {
      throw new Error("Vector sizes must match for subtraction.");
    }

    this.data.forEach((element, i) => {
      resultData.push(element - other.data[i]);
    });

    return new Vector(this.size, resultData);
  }

  multiply(other: IVector | number): IVector {
    const resultData: number[] = [];

    if (typeof other === "number") {
      this.data.forEach((element) => {
        resultData.push(element * other);
      });

      return new Vector(this.size, resultData);
    }

    if (this.size !== other.size) {
      throw new Error("Vector sizes must match for multiplication.");
    }

    this.data.forEach((element, i) => {
      resultData.push(element * other.data[i]);
    });

    return new Vector(this.size, resultData);
  }

  divide(other: IVector | number): IVector {
    const resultData: number[] = [];

    if (typeof other === "number") {
      if (other === 0) {
        throw new Error("Division by zero is not allowed.");
      }
      this.data.forEach((element) => {
        resultData.push(element / other);
      });

      return new Vector(this.size, resultData);
    }

    if (this.size !== other.size) {
      throw new Error("Vector sizes must match for division.");
    }

    this.data.forEach((element, i) => {
      if (other.data[i] === 0) {
        throw new Error("Division by zero is not allowed.");
      }
      resultData.push(element / other.data[i]);
    });

    return new Vector(this.size, resultData);
  }

  magnitude(): number {
    return Math.sqrt(
      this.data.reduce((sum, element) => sum + element * element, 0),
    );
  }

  normalize(): IVector {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector.");
    }
    return this.divide(mag);
  }

  dot(other: IVector): number {
    if (this.size !== other.size) {
      throw new Error("Vector sizes must match for dot product.");
    }
    return this.data.reduce(
      (sum, element, i) => sum + element * other.data[i],
      0,
    );
  }

  cross(other: IVector): IVector {
    const resultData: number[] = [];

    if (this.size !== 3 || other.size !== 3) {
      throw new Error("Cross product is only defined for 3D vectors.");
    }

    resultData.push(
      this.data[1] * other.data[2] - this.data[2] * other.data[1],
      this.data[2] * other.data[0] - this.data[0] * other.data[2],
      this.data[0] * other.data[1] - this.data[1] * other.data[0],
    );

    return new Vector(3, resultData);
  }
}

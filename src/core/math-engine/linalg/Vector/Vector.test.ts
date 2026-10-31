import { describe, expect, it } from "vitest";
import { Vector } from "./Vector"; // Укажи правильный путь к классу, если он экспортируется иначе

describe("Vector", () => {
  describe("constructor", () => {
    it("creates a vector when size matches the data length", () => {
      const data = [1, 2, 3];
      const vector = new Vector(3, data);

      expect(vector.size).toBe(3);
      expect(vector.data).toEqual(data);
    });

    it.each([0, -1, -5])("rejects non-positive sizes (%i)", (size) => {
      expect(() => new Vector(size, [1, 2])).toThrow(
        "Vector size must be a positive integer.",
      );
    });

    it("rejects data whose length does not match the specified size", () => {
      expect(() => new Vector(3, [1, 2])).toThrow(
        "Data length does not match specified size.",
      );
    });
  });

  describe("add", () => {
    it("adds a scalar to every element", () => {
      const v = new Vector(2, [1, 2]);
      const result = v.add(5);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([6, 7]);
      // Проверяем иммутабельность исходного вектора
      expect(v.data).toEqual([1, 2]);
    });

    it("adds two vectors element by element", () => {
      const v1 = new Vector(3, [1, 2, 3]);
      const v2 = new Vector(3, [4, 5, 6]);
      const result = v1.add(v2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([5, 7, 9]);
    });

    it("rejects vectors with different sizes for addition", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(3, [1, 2, 3]);

      expect(() => v1.add(v2)).toThrow("Vector sizes must match for addition.");
    });
  });

  describe("subtract", () => {
    it("subtracts a scalar from every element", () => {
      const v = new Vector(2, [5, 7]);
      const result = v.subtract(2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([3, 5]);
    });

    it("subtracts two vectors element by element", () => {
      const v1 = new Vector(2, [5, 8]);
      const v2 = new Vector(2, [2, 1]);
      const result = v1.subtract(v2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([3, 7]);
    });

    it("rejects vectors with different sizes for subtraction", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(1, [1]);

      expect(() => v1.subtract(v2)).toThrow(
        "Vector sizes must match for subtraction.",
      );
    });
  });

  describe("multiply", () => {
    it("multiplies every element by a scalar", () => {
      const v = new Vector(2, [2, 3]);
      const result = v.multiply(4);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([8, 12]);
    });

    it("multiplies two vectors element by element", () => {
      const v1 = new Vector(2, [2, 3]);
      const v2 = new Vector(2, [4, 5]);
      const result = v1.multiply(v2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([8, 15]);
    });

    it("rejects vectors with different sizes for multiplication", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(3, [1, 2, 3]);

      expect(() => v1.multiply(v2)).toThrow(
        "Vector sizes must match for multiplication.",
      );
    });
  });

  describe("divide", () => {
    it("divides every element by a scalar", () => {
      const v = new Vector(2, [6, 8]);
      const result = v.divide(2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([3, 4]);
    });

    it("divides two vectors element by element", () => {
      const v1 = new Vector(2, [10, 20]);
      const v2 = new Vector(2, [2, 5]);
      const result = v1.divide(v2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.data).toEqual([5, 4]);
    });

    it("throws error on division by zero scalar", () => {
      const v = new Vector(2, [1, 2]);
      expect(() => v.divide(0)).toThrow("Division by zero is not allowed.");
    });

    it("throws error on division by zero vector element", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(2, [1, 0]);

      expect(() => v1.divide(v2)).toThrow("Division by zero is not allowed.");
    });

    it("rejects vectors with different sizes for division", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(1, [1]);

      expect(() => v1.divide(v2)).toThrow(
        "Vector sizes must match for division.",
      );
    });
  });

  describe("magnitude", () => {
    it("calculates the magnitude (Euclidean norm) of a vector", () => {
      const v = new Vector(2, [3, 4]);
      expect(v.magnitude()).toBe(5); // 3^2 + 4^2 = 25, sqrt = 5
    });

    it("calculates magnitude for zero vector", () => {
      const v = new Vector(3, [0, 0, 0]);
      expect(v.magnitude()).toBe(0);
    });
  });

  describe("normalize", () => {
    it("normalizes a vector to unit length", () => {
      const v = new Vector(2, [3, 4]);
      const result = v.normalize();

      expect(result).toBeInstanceOf(Vector);
      expect(result.magnitude()).toBeCloseTo(1, 5);
      expect(result.data[0]).toBeCloseTo(0.6, 5);
      expect(result.data[1]).toBeCloseTo(0.8, 5);
    });

    it("throws an error when attempting to normalize a zero vector", () => {
      const v = new Vector(3, [0, 0, 0]);
      expect(() => v.normalize()).toThrow("Cannot normalize a zero vector.");
    });
  });

  describe("dot", () => {
    it("calculates the dot product of two vectors", () => {
      const v1 = new Vector(3, [1, 2, 3]);
      const v2 = new Vector(3, [4, 5, 6]);
      // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32

      expect(v1.dot(v2)).toBe(32);
    });

    it("rejects vectors with different sizes for dot product", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(3, [1, 2, 3]);

      expect(() => v1.dot(v2)).toThrow(
        "Vector sizes must match for dot product.",
      );
    });
  });

  describe("cross", () => {
    it("calculates the cross product of two 3D vectors", () => {
      const v1 = new Vector(3, [1, 0, 0]);
      const v2 = new Vector(3, [0, 1, 0]);
      const result = v1.cross(v2);

      expect(result).toBeInstanceOf(Vector);
      expect(result.size).toBe(3);
      expect(result.data).toEqual([0, 0, 1]); // i x j = k
    });

    it("rejects cross product if either vector is not 3D", () => {
      const v1 = new Vector(2, [1, 2]);
      const v2 = new Vector(3, [1, 2, 3]);

      expect(() => v1.cross(v2)).toThrow(
        "Cross product is only defined for 3D vectors.",
      );
    });
  });
});

import { describe, expect, it } from "vitest";
import { Vector } from "../../linalg/Vector/Vector";
import { EulerSolver } from "./Euler";

describe("EulerSolver", () => {
  it("performs a single integration step correctly for a constant derivative", () => {
    const solver = new EulerSolver();

    const initialState = new Vector(2, [1, 2]);

    const derivativeFn = (t: number, state: Vector) => {
      return new Vector(2, [3, 4]);
    };

    const dt = 0.1;
    const nextState = solver.step(0, initialState, dt, derivativeFn);

    expect(nextState).toBeInstanceOf(Vector);
    expect(nextState.size).toBe(2);
    expect(nextState.data[0]).toBeCloseTo(1.3);
    expect(nextState.data[1]).toBeCloseTo(2.4);

    expect(initialState.data).toEqual([1, 2]);
  });

  it("rejects non-positive time step (dt)", () => {
    const solver = new EulerSolver();
    const state = new Vector(1, [1]);
    const derivativeFn = (t: number, s: Vector) => s;

    expect(() => solver.step(0, state, 0, derivativeFn)).toThrow(
      "Time step (dt) must be a positive number.",
    );
    expect(() => solver.step(0, state, -0.05, derivativeFn)).toThrow(
      "Time step (dt) must be a positive number.",
    );
  });

  it("rejects when derivative vector size does not match state size", () => {
    const solver = new EulerSolver();
    const state = new Vector(2, [1, 2]);
    const derivativeFn = () => new Vector(3, [1, 2, 3]);

    expect(() => solver.step(0, state, 0.1, derivativeFn)).toThrow(
      "Derivative vector size must match the state vector size.",
    );
  });
});

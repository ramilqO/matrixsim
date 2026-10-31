import { describe, expect, it } from "vitest";
import { Vector } from "../../linalg/Vector/Vector";
import { RungeKutta4Solver } from "./Runge-Kutta4";

describe("RungeKutta4Solver", () => {
  it("performs a single integration step correctly for a constant derivative", () => {
    const solver = new RungeKutta4Solver();

    const initialState = new Vector(2, [1, 2]);

    const derivativeFn = () => new Vector(2, [3, 4]);

    const dt = 0.1;
    // For a constant derivative, RK4 yields the exact same linear result:
    // x(0.1) = [1, 2] + [3, 4] * 0.1 = [1.3, 2.4]
    const nextState = solver.step(0, initialState, dt, derivativeFn);

    expect(nextState).toBeInstanceOf(Vector);
    expect(nextState.size).toBe(2);
    expect(nextState.data[0]).toBeCloseTo(1.3);
    expect(nextState.data[1]).toBeCloseTo(2.4);

    expect(initialState.data).toEqual([1, 2]);
  });

  it("solves an exponential growth differential equation accurately (dx/dt = x)", () => {
    const solver = new RungeKutta4Solver();

    const initialState = new Vector(1, [1]);
    const derivativeFn = (_t: number, state: Vector) => {
      return new Vector(1, [state.data[0]]);
    };

    const dt = 0.01;
    const nextState = solver.step(0, initialState, dt, derivativeFn);

    const expected = Math.exp(0.01);
    expect(nextState.data[0]).toBeCloseTo(expected, 6);
  });

  it("rejects non-positive time step (dt)", () => {
    const solver = new RungeKutta4Solver();
    const state = new Vector(1, [1]);
    const derivativeFn = (_t: number, s: Vector) => s;

    expect(() => solver.step(0, state, 0, derivativeFn)).toThrow(
      "Time step (dt) must be a positive number.",
    );
    expect(() => solver.step(0, state, -0.1, derivativeFn)).toThrow(
      "Time step (dt) must be a positive number.",
    );
  });

  it("rejects when derivative vector size does not match state size", () => {
    const solver = new RungeKutta4Solver();
    const state = new Vector(2, [1, 2]);
    const derivativeFn = () => new Vector(3, [1, 2, 3]);

    expect(() => solver.step(0, state, 0.1, derivativeFn)).toThrow(
      "Derivative vector size must match the state vector size.",
    );
  });
});

import { Vector } from "../../linalg/Vector/Vector";
import { IRK4Solver, RK4DerivativeFunction } from "./Runge-Kutta4.type";

/**
 * Implements the classical Runge-Kutta 4th order (RK4) numerical integration method.
 * Provides high precision (4th order accuracy) for dynamic systems and ODEs.
 */
export class RungeKutta4Solver implements IRK4Solver {
  /**
   * Executes a single step of RK4 integration.
   *
   * @throws Error if time step (dt) is less than or equal to zero.
   * @throws Error if any evaluated derivative vector size mismatches the state vector size.
   */
  step(
    t: number,
    state: Vector,
    dt: number,
    derivativeFn: RK4DerivativeFunction,
  ): Vector {
    if (dt <= 0) {
      throw new Error("Time step (dt) must be a positive number.");
    }

    const stateSize = state.size;

    const k1 = derivativeFn(t, state);
    if (k1.size !== stateSize) {
      throw new Error(
        "Derivative vector size must match the state vector size.",
      );
    }

    const stateK2 = state.add(k1.multiply(dt * 0.5)) as Vector;
    const k2 = derivativeFn(t + dt * 0.5, stateK2);
    if (k2.size !== stateSize) {
      throw new Error(
        "Derivative vector size must match the state vector size.",
      );
    }

    const stateK3 = state.add(k2.multiply(dt * 0.5)) as Vector;
    const k3 = derivativeFn(t + dt * 0.5, stateK3);
    if (k3.size !== stateSize) {
      throw new Error(
        "Derivative vector size must match the state vector size.",
      );
    }

    const stateK4 = state.add(k3.multiply(dt)) as Vector;
    const k4 = derivativeFn(t + dt, stateK4);
    if (k4.size !== stateSize) {
      throw new Error(
        "Derivative vector size must match the state vector size.",
      );
    }

    const weightedSum = k1
      .add(k2.multiply(2))
      .add(k3.multiply(2))
      .add(k4) as Vector;

    const delta = weightedSum.multiply(dt / 6);

    return state.add(delta) as Vector;
  }
}

import { Vector } from "../../linalg/Vector/Vector"; // Укажи правильный путь к Vector

/**
 * Represents a derivative function for the Euler solver: f(t, x) = dx/dt.
 */
export type EulerDerivativeFunction = (t: number, state: Vector) => Vector;

export interface IEulerSolver {
  /**
   * Executes a single step of Euler integration.
   *
   * @throws Error if time step (dt) is less than or equal to zero.
   * @throws Error if the returned derivative vector size mismatches the state vector size.
   */
  step(
    t: number,
    state: Vector,
    dt: number,
    derivativeFn: EulerDerivativeFunction,
  ): Vector;
}

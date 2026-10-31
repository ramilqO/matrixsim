import { Vector } from "../../linalg/Vector/Vector";

/**
 * Represents a derivative function for the Runge-Kutta 4 solver: f(t, x) = dx/dt.
 *
 * @param t - Current time scalar.
 * @param state - Current state vector.
 * @returns The derivative vector (rate of change).
 */
export type RK4DerivativeFunction = (t: number, state: Vector) => Vector;

/**
 * Interface defining the contract for the Runge-Kutta 4th order (RK4) numerical integration solver.
 */
export interface IRK4Solver {
  /**
   * Performs a single 4th-order Runge-Kutta integration step.
   *
   * @param t - Current time.
   * @param state - Current state vector.
   * @param dt - Time step size.
   * @param derivativeFn - Function evaluating the system derivative.
   * @returns The updated state vector after the time step.
   */
  step(
    t: number,
    state: Vector,
    dt: number,
    derivativeFn: RK4DerivativeFunction,
  ): Vector;
}

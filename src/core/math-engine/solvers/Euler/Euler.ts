import { Vector } from "../../linalg/Vector/Vector";
import { IEulerSolver } from "./Euler.type";

type EulerDerivativeFunction = (t: number, state: Vector) => Vector;

/**
 * Implements the explicit Euler method (first-order numerical integration).
 * Formula: x_{n+1} = x_n + f(t_n, x_n) * dt
 */
export class EulerSolver implements IEulerSolver {
  step(
    t: number,
    state: Vector,
    dt: number,
    derivativeFn: EulerDerivativeFunction,
  ): Vector {
    if (dt <= 0) {
      throw new Error("Time step (dt) must be a positive number.");
    }

    const derivative = derivativeFn(t, state);

    if (derivative.size !== state.size) {
      throw new Error(
        "Derivative vector size must match the state vector size.",
      );
    }

    const delta = derivative.multiply(dt);

    return state.add(delta) as Vector;
  }
}

import { Vector } from "../../linalg/Vector/Vector";

/**
 * Represents a derivative function for the simulation system: f(t, x) = dx/dt.
 *
 * @param t - Current simulation time.
 * @param state - Current state vector.
 * @returns The derivative vector (rate of change).
 */
export type SimulationDerivativeFunction = (t: number, state: Vector) => Vector;

/**
 * Contains the complete time-series results of a simulation run.
 */
export interface SimulationResult {
  /** Array of discrete time points. */
  times: number[];
  /** Array of state vectors corresponding to each time point. */
  states: Vector[];
}

/**
 * Interface defining the contract for the simulation runner (dispatcher).
 */
export interface ISimulationRunner {
  /**
   * Executes the simulation from t = 0 up to tMax using a fixed or adaptive time step.
   *
   * @param initialState - Starting state vector of the system.
   * @param tMax - Total simulation time horizon.
   * @param dt - Integration time step.
   * @param derivativeFn - System derivative function.
   * @returns SimulationResult containing times and states history.
   */
  run(
    initialState: Vector,
    tMax: number,
    dt: number,
    derivativeFn: SimulationDerivativeFunction,
  ): SimulationResult;
}

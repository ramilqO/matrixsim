import { Vector } from "../../linalg/Vector/Vector";
import { IRK4Solver } from "../Runge-Kutta4/Runge-Kutta4.type";
import {
  ISimulationRunner,
  SimulationDerivativeFunction,
  SimulationResult,
} from "./Simulation-Runner.type";

export class SimulationRunner implements ISimulationRunner {
  constructor(private solver: IRK4Solver) {}

  public run(
    initialState: Vector,
    tMax: number,
    dt: number,
    derivativeFn: SimulationDerivativeFunction,
  ): SimulationResult {
    if (dt <= 0 || tMax <= 0) {
      throw new Error("tMax and dt must be positive numbers.");
    }

    const times: number[] = [0];
    const states: Vector[] = [initialState];

    let currentTime = 0;
    let currentState = initialState;

    while (currentTime < tMax) {
      const stepDt = Math.min(dt, tMax - currentTime);

      currentState = this.solver.step(
        currentTime,
        currentState,
        stepDt,
        derivativeFn,
      );
      currentTime += stepDt;

      times.push(currentTime);
      states.push(currentState);
    }

    return { times, states };
  }
}

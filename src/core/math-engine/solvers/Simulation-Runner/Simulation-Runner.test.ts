import { describe, expect, it } from "vitest";
import { Vector } from "../../linalg/Vector/Vector";
import { RungeKutta4Solver } from "../Runge-Kutta4/Runge-Kutta4";
import { SimulationRunner } from "./Simulation-Runner";

describe("SimulationRunner with Harmonic Oscillator", () => {
  it("simulates a mass-spring system and outputs trajectory", () => {
    const solver = new RungeKutta4Solver();
    const runner = new SimulationRunner(solver);

    // Initial state: position = 1, velocity = 0 (stretched spring released from rest)
    const initialState = new Vector(2, [1, 0]);

    // Harmonic oscillator equations:
    // dp/dt = v
    // dv/dt = -p (assuming mass = 1, stiffness = 1)
    const derivativeFn = (_t: number, state: Vector) => {
      const p = state.data[0];
      const v = state.data[1];
      return new Vector(2, [v, -p]);
    };

    const tMax = Math.PI / 2; // Quarter of a full period (cos(pi/2) = 0, sin(pi/2) = 1)
    const dt = 0.1;

    const result = runner.run(initialState, tMax, dt, derivativeFn);

    expect(result.times.length).toBeGreaterThan(0);
    expect(result.states.length).toBe(result.times.length);

    // At t = pi/2 (~1.57s), position should be close to 0 and velocity close to -1
    const finalState = result.states[result.states.length - 1];
    expect(finalState.data[0]).toBeCloseTo(0, 1);
    expect(finalState.data[1]).toBeCloseTo(-1, 1);
  });
});

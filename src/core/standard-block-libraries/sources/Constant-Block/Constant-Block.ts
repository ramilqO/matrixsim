import { IBlock } from "../../base/Block.type";

/**
 * Outputs a constant signal value regardless of time or input signals.
 * Useful as a steady-state setpoint or bias.
 */
export class ConstantBlock implements IBlock {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public value: number,
  ) {}

  /**
   * Returns the preset constant value. Ignores incoming inputs.
   */
  step(_t: number, _inputs: number[]): number[] {
    return [this.value];
  }
}

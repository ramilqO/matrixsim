import { IBlock } from "../../base/Block.type";

/**
 * Supported signs for inputs in a Sum block (+ or -).
 */
export type SumSign = "+" | "-";

/**
 * Sums or subtracts multiple input signals according to specified signs.
 */
export class SumBlock implements IBlock {
  private signs: SumSign[];

  constructor(
    public readonly id: string,
    public readonly name: string,
    signsOrInputCount: SumSign[] | number,
  ) {
    if (Array.isArray(signsOrInputCount)) {
      this.signs = signsOrInputCount;
    } else {
      // Default all inputs to '+' if only count is provided
      this.signs = Array(signsOrInputCount).fill("+");
    }
  }

  /**
   * Executes the summation step.
   */
  step(t: number, inputs: number[]): number[] {
    if (inputs.length !== this.signs.length) {
      throw new Error(
        `SumBlock [${this.name}] (id: ${this.id}) expected ${this.signs.length} inputs, but got ${inputs.length}.`,
      );
    }

    let result = 0;
    for (let i = 0; i < inputs.length; i++) {
      const sign = this.signs[i];
      const val = inputs[i];
      if (sign === "+") {
        result += val;
      } else {
        result -= val;
      }
    }

    return [result];
  }
}

import { IBlock } from "../../base/Block.type";

export class GainBlock implements IBlock {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public gain: number,
  ) {}

  step(t: number, inputs: number[]): number[] {
    if (inputs.length === 0) {
      throw new Error(
        `GainBlock [${this.name}] (id: ${this.id}) requires at least 1 input signal.`,
      );
    }

    const inputSignal = inputs[0];
    const outputSignal = inputSignal * this.gain;

    return [outputSignal];
  }
}

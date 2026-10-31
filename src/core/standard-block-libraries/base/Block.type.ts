/**
 * Represents the core contract for any simulation block in standard libraries.
 */
export interface IBlock {
  readonly id: string;
  readonly name: string;

  /**
   * Computes the block's output signals given the current time and incoming inputs.
   *
   * @param t - Current simulation time.
   * @param inputs - Array of incoming signal values from connected upstream blocks.
   * @returns Array of outgoing signal values.
   */
  step(t: number, inputs: number[]): number[];
}

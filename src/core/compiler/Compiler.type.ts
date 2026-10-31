import { IBlock } from "../standard-block-libraries/base/Block.type";

/**
 * Represents a wire connecting an output port of a source block
 * to an input port of a target block.
 */
export interface BlockConnection {
  fromBlockId: string;
  fromPort: number; // Usually 0 for single-output blocks
  toBlockId: string;
  toPort: number; // Index of the input array on the target block
}

/**
 * Definition of a full simulation block diagram (graph).
 */
export interface SimulationGraphDefinition {
  blocks: IBlock[];
  connections: BlockConnection[];
}

/**
 * Compiled executable simulation step handler.
 */
export type CompiledStepFunction = (t: number) => Map<string, number[]>;

import { IBlock } from "src/core/standard-block-libraries/base/Block.type";
import {
  SimulationGraphDefinition,
  CompiledStepFunction,
} from "../Compiler.type";

export class GraphCompiler {
  /**
   * Compiles a simulation graph definition into an optimized, executable step function.
   */
  public static compile(
    graph: SimulationGraphDefinition,
  ): CompiledStepFunction {
    const blockMap = new Map<string, IBlock>();
    graph.blocks.forEach((b) => blockMap.set(b.id, b));

    // 1. Build adjacency list and incoming dependency counts for topological sort
    const adjList = new Map<string, string[]>(); // from -> [to...]
    const inDegree = new Map<string, number>();

    graph.blocks.forEach((b) => {
      adjList.set(b.id, []);
      inDegree.set(b.id, 0);
    });

    graph.connections.forEach((conn) => {
      // Target block depends on source block
      const targets = adjList.get(conn.fromBlockId) || [];
      targets.push(conn.toBlockId);
      adjList.set(conn.fromBlockId, targets);

      const currentDegree = inDegree.get(conn.toBlockId) || 0;
      inDegree.set(conn.toBlockId, currentDegree + 1);
    });

    // 2. Topological sort (Kahn's algorithm)
    const queue: string[] = [];
    inDegree.forEach((degree, blockId) => {
      if (degree === 0) {
        queue.push(blockId);
      }
    });

    const executionOrder: IBlock[] = [];
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const block = blockMap.get(currentId);
      if (block) {
        executionOrder.push(block);
      }

      const neighbors = adjList.get(currentId) || [];
      for (const neighborId of neighbors) {
        const deg = inDegree.get(neighborId)! - 1;
        inDegree.set(neighborId, deg);
        if (deg === 0) {
          queue.push(neighborId);
        }
      }
    }

    if (executionOrder.length !== graph.blocks.length) {
      throw new Error(
        "Cyclic dependency detected in the simulation block graph!",
      );
    }

    // 3. Cache outputs per block to route signals between steps
    const blockOutputs = new Map<string, number[]>();

    // 4. Return the executable step runner function
    return (t: number) => {
      for (const block of executionOrder) {
        // Collect inputs for this block based on connections
        const incomingConnections = graph.connections.filter(
          (c) => c.toBlockId === block.id,
        );

        // Sort incoming connections by target port index
        incomingConnections.sort((a, b) => a.toPort - b.toPort);

        const inputs: number[] = [];
        for (const conn of incomingConnections) {
          const sourceOutputs = blockOutputs.get(conn.fromBlockId);
          if (!sourceOutputs || sourceOutputs[conn.fromPort] === undefined) {
            throw new Error(
              `Unresolved signal: Block [${conn.fromBlockId}] port ${conn.fromPort} has no output.`,
            );
          }
          inputs.push(sourceOutputs[conn.fromPort]);
        }

        // Execute block step
        const outputs = block.step(t, inputs);
        blockOutputs.set(block.id, outputs);
      }

      return blockOutputs;
    };
  }
}

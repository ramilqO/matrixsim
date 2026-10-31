import { describe, expect, it } from "vitest";
import { GraphCompiler } from "./GraphCompiler";
import { ConstantBlock, GainBlock } from "@matrixsim/sbl";

describe("GraphCompiler", () => {
  it("compiles and executes a connected chain (Constant -> Gain)", () => {
    const constant = new ConstantBlock("src", "MyConstant", 4.0);
    const gain = new GainBlock("amp", "MyAmplifier", 2.5);

    const stepFn = GraphCompiler.compile({
      blocks: [gain, constant], // Order in array shouldn't matter due to topological sort
      connections: [
        {
          fromBlockId: "src",
          fromPort: 0,
          toBlockId: "amp",
          toPort: 0,
        },
      ],
    });

    const results = stepFn(0);

    expect(results.get("src")).toEqual([4.0]);
    expect(results.get("amp")).toEqual([10.0]); // 4.0 * 2.5 = 10.0
  });

  it("detects cyclic dependencies and throws an error", () => {
    // Block A -> Block B -> Block A (Cycle)
    const blockA = new GainBlock("a", "BlockA", 1.0);
    const blockB = new GainBlock("b", "BlockB", 1.0);

    expect(() => {
      GraphCompiler.compile({
        blocks: [blockA, blockB],
        connections: [
          { fromBlockId: "a", fromPort: 0, toBlockId: "b", toPort: 0 },
          { fromBlockId: "b", fromPort: 0, toBlockId: "a", toPort: 0 },
        ],
      });
    }).toThrow("Cyclic dependency detected in the simulation block graph!");
  });
});

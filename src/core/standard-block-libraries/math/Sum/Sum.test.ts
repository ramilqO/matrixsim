import { describe, expect, it } from "vitest";
import { SumBlock } from "./Sum";

describe("SumBlock", () => {
  it("sums multiple inputs with default '+' signs", () => {
    const sum = new SumBlock("s1", "Adder", 3);
    const result = sum.step(0, [1.0, 2.0, 3.0]);

    expect(result).toEqual([6.0]);
  });

  it("handles mixed addition and subtraction (e.g. error calculation)", () => {
    // e.g., Reference (10) - Feedback (3) = 7
    const errorSum = new SumBlock("s2", "ErrorCalc", ["+", "-"]);
    const result = errorSum.step(0, [10.0, 3.0]);

    expect(result).toEqual([7.0]);
  });

  it("throws an error if input count does not match configured signs", () => {
    const sum = new SumBlock("s3", "StrictSum", ["+", "+"]);

    expect(() => sum.step(0, [1.0])).toThrow(
      "SumBlock [StrictSum] (id: s3) expected 2 inputs, but got 1.",
    );
  });
});

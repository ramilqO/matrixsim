import { describe, expect, it } from "vitest";
import { ConstantBlock } from "./Constant-Block";

describe("ConstantBlock", () => {
  it("always outputs the configured constant value", () => {
    const constant = new ConstantBlock("c1", "RefVoltage", 5.0);

    expect(constant.step(0, [])).toEqual([5.0]);
    expect(constant.step(10.5, [99.0])).toEqual([5.0]); // Ignores time and inputs
  });
});

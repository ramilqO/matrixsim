import { describe, expect, it } from "vitest";
import { GainBlock } from "./Gain";

describe("GainBlock", () => {
  it("multiplies input signal by the specified gain coefficient", () => {
    const amplifier = new GainBlock("g1", "MainAmplifier", 3.5);

    // Pass input signal value = 2.0 at t = 0
    const outputs = amplifier.step(0, [2.0]);

    expect(outputs.length).toBe(1);
    expect(outputs[0]).toBe(7.0); // 2.0 * 3.5 = 7.0
  });

  it("throws an error if no input signals are provided", () => {
    const amplifier = new GainBlock("g1", "MainAmplifier", 1.0);

    expect(() => amplifier.step(0, [])).toThrow(
      "GainBlock [MainAmplifier] (id: g1) requires at least 1 input signal.",
    );
  });
});

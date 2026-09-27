/**
 * Fleet-standard memory-leak regression suite (SceneryStackTemplate / QubitSketch pattern).
 *
 * Creates a disposable model object inside a function boundary, disposes it, forces
 * garbage collection via global.gc (--expose-gc in vitest.config.ts), then asserts via
 * WeakRef that the object was collected. V8 requires a function boundary (not merely
 * a block scope) so local strong references die when the helper returns.
 */

import { describe, expect, it } from "vitest";
import { GeigerCountSource } from "../src/common/model/GeigerCountSource.js";
import { RadioactivityModel } from "../src/common/model/RadioactivityModel.js";
import { SimulatedCountSource } from "../src/common/model/SimulatedCountSource.js";
import { describeDisposalLeaks, forceGC } from "./helpers/memoryLeak.js";

/**
 * The count source is the sim's most churned disposable: it owns Properties and
 * is created afresh for every screen, so a leak here would accumulate across a
 * session of switching screens.
 */
function createAndDisposeCountSource(): WeakRef<object> {
  const source = new SimulatedCountSource(20);
  const ref = new WeakRef<object>(source);
  source.dispose();
  return ref;
}

describe("Memory leak regression", () => {
  it("SimulatedCountSource is collected after dispose", async () => {
    const ref = createAndDisposeCountSource();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/dispose cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDisposeCountSource());
    }
    await forceGC(refs);
    const survivors = refs.filter((r) => r.deref() !== undefined).length;
    expect(survivors).toBe(0);
  });
});

describeDisposalLeaks([
  { name: "GeigerCountSource", create: () => new GeigerCountSource() },
  { name: "RadioactivityModel", create: () => new RadioactivityModel() },
]);

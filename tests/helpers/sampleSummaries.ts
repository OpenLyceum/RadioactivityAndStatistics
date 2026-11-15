/** Array fixtures adapted to the same tally/accumulator APIs used by live acquisition. */
import { CountTally, chooseBinWidthOf, createHistogramOf, type Histogram } from "../../src/common/model/Histogram.js";
import {
  accumulateValue,
  EMPTY_ACCUMULATOR,
  type SampleStatistics,
  statisticsOf,
} from "../../src/common/model/Statistics.js";

function createTally(values: readonly number[]): CountTally {
  const tally = new CountTally();
  for (const value of values) {
    tally.add(value);
  }
  return tally;
}

/** Bins a complete test fixture through the runtime tally API. */
export function createHistogram(values: readonly number[], binWidth?: number): Histogram {
  return createHistogramOf(createTally(values), binWidth);
}

/** Chooses fixture bin widths through the runtime tally API. */
export function chooseBinWidth(values: readonly number[]): number {
  return chooseBinWidthOf(createTally(values));
}

/** Folds a complete fixture through the runtime statistics API. */
export function computeStatistics(values: readonly number[]): SampleStatistics {
  let state = EMPTY_ACCUMULATOR;
  for (const value of values) {
    state = accumulateValue(state, value);
  }
  return statisticsOf(state);
}

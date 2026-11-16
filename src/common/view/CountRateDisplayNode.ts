import { COUNT_RATE_DISPLAY_NODE_SETTINGS } from "../../RadioactivityAndStatisticsConstants.js";
/**
 * CountRateDisplayNode.ts
 *
 * The hero readout: count rate from the most recently completed interval, with
 * the in-progress interval shown underneath.
 *
 * This is a "stat tile", not a chart — the number is the message, so it gets
 * size and the labels stay small and recessive. The secondary line exists
 * because a bare rate that only updates once per interval looks frozen at long
 * interval settings; showing the interval filling up makes the instrument
 * visibly alive.
 */

import { DerivedProperty } from "scenerystack/axon";
import { toFixed } from "scenerystack/dot";
import { Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import RadioactivityAndStatisticsColors from "../../RadioactivityAndStatisticsColors.js";
import type { RadioactivityModel } from "../model/RadioactivityModel.js";

/** Decimal places on the rate; a tenth of a count per second is plenty. */
const RATE_DECIMALS = 1;

export class CountRateDisplayNode extends VBox {
  private readonly disposeCountRateDisplayNode: () => void;

  public constructor(model: RadioactivityModel) {
    const readoutStrings = StringManager.getInstance().getReadoutStrings();

    const rateValueProperty = new DerivedProperty([model.lastCountRateProperty], (rate) =>
      toFixed(rate, RATE_DECIMALS),
    );
    const intervalValueProperty = new DerivedProperty(
      [model.intervalCountsProperty, model.intervalElapsedProperty, model.countingIntervalProperty],
      (counts, elapsed, interval) => `${Math.max(0, Math.round(counts))} (${toFixed(elapsed, 1)}/${interval} s)`,
    );

    const caption = new Text(readoutStrings.countRateStringProperty, {
      font: new PhetFont(COUNT_RATE_DISPLAY_NODE_SETTINGS.CAPTION_FONT_SIZE),
      fill: RadioactivityAndStatisticsColors.secondaryTextColorProperty,
    });

    const value = new Text(rateValueProperty, {
      font: new PhetFont({ size: COUNT_RATE_DISPLAY_NODE_SETTINGS.VALUE_FONT_SIZE, weight: "bold" }),
      fill: RadioactivityAndStatisticsColors.textColorProperty,
    });

    const units = new Text(readoutStrings.countsPerSecondStringProperty, {
      font: new PhetFont(COUNT_RATE_DISPLAY_NODE_SETTINGS.UNITS_FONT_SIZE),
      fill: RadioactivityAndStatisticsColors.secondaryTextColorProperty,
    });

    const intervalCaption = new Text(readoutStrings.thisIntervalStringProperty, {
      font: new PhetFont(COUNT_RATE_DISPLAY_NODE_SETTINGS.INTERVAL_CAPTION_FONT_SIZE),
      fill: RadioactivityAndStatisticsColors.secondaryTextColorProperty,
    });

    const intervalValue = new Text(intervalValueProperty, {
      font: new PhetFont({ size: COUNT_RATE_DISPLAY_NODE_SETTINGS.INTERVAL_VALUE_FONT_SIZE, weight: "bold" }),
      fill: RadioactivityAndStatisticsColors.secondaryTextColorProperty,
    });

    super({
      align: "center",
      spacing: COUNT_RATE_DISPLAY_NODE_SETTINGS.CONSTRUCTOR_SPACING,
      children: [caption, value, units, intervalCaption, intervalValue],
    });

    this.disposeCountRateDisplayNode = () => {
      rateValueProperty.dispose();
      intervalValueProperty.dispose();
    };
  }

  public override dispose(): void {
    this.disposeCountRateDisplayNode();
    super.dispose();
  }
}

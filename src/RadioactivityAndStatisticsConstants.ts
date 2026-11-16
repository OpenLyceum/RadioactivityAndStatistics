/**
 * RadioactivityAndStatisticsConstants.ts
 *
 * Every named numeric constant used across the simulation. Values that carry
 * semantic meaning live here rather than inline, so they are named, documented,
 * and changed in one place.
 *
 * Conventions
 * ───────────
 *  - Model values use SI units; the unit is noted on each value.
 *  - Layout values are in screen pixels of the 1024 × 618 layout space.
 *  - Colours live in RadioactivityAndStatisticsColors.ts, not here.
 */

import { Range } from "scenerystack/dot";
import RadioactivityAndStatisticsNamespace from "./RadioactivityAndStatisticsNamespace.js";

// ── Layout / chrome (screen pixels) ───────────────────────────────────────────

/** Margin between the screen edge and edge-anchored controls (e.g. Reset All). */
export const SCREEN_VIEW_MARGIN = 20;

/** Corner radius shared by control panels and dialogs. */
export const PANEL_CORNER_RADIUS = 6;

/** Vertical gap between stacked panels in a control column. */
export const PANEL_SPACING = 10;

/**
 * Clear space left between the centre chart and the control columns either
 * side of it. The chart is also hard-capped to the gap it is given, so a font
 * or translation that makes its labels wider scales it down rather than letting
 * it grow underneath a panel.
 */
export const CENTRE_COLUMN_PADDING = 16;

/** Width of the control column on the right-hand side of both screens. */
export const CONTROL_PANEL_WIDTH = 225;

// ── Charts (screen pixels) ────────────────────────────────────────────────────

/** Plot area of the histogram, shown on either screen. */
export const HISTOGRAM_CHART_SIZE = { width: 380, height: 440 } as const;

/** Plot area of the count-rate strip chart, shown on either screen. */
export const RATE_CHART_SIZE = { width: 420, height: 330 } as const;

/** Stroke width of plotted model curves. */
export const CURVE_LINE_WIDTH = 2;

/** Dash pattern distinguishing each model curve without relying on colour. */
export const CURVE_DASH_PATTERNS = {
  /** Poisson prediction — solid. */
  poisson: [] as number[],
  /** Gaussian prediction from √mean — dashed. */
  gaussianPrediction: [8, 4] as number[],
  /** Best-fit Gaussian — dash-dot. */
  gaussianFit: [10, 3, 2, 3] as number[],
} as const;

/** Gap left between adjacent histogram bars, in view pixels. */
export const HISTOGRAM_BAR_GAP = 2;

// ── Data table (screen pixels) ────────────────────────────────────────────────

/** How many sample rows the data table shows at once. */
export const TABLE_VISIBLE_ROWS = 16;

/** Height of one data-table row. */
export const TABLE_ROW_HEIGHT = 20;

/** Width of the data table, including all columns. */
export const TABLE_WIDTH = 230;

// ── Acquisition defaults and ranges ───────────────────────────────────────────

/** Counting interval in seconds: how long each measurement accumulates. */
export const COUNTING_INTERVAL_RANGE = new Range(0.5, 20);

/** Arrow-button step for the counting interval. */
export const COUNTING_INTERVAL_DELTA = 0.5;

/** Decimal places shown for the counting interval. */
export const COUNTING_INTERVAL_DECIMAL_PLACES = 1;

/**
 * Counting interval range on the Simulation screen, whose fastest rate is not
 * limited by any hardware polling rate the way a real Geiger counter is.
 */
export const SIMULATION_COUNTING_INTERVAL_RANGE = new Range(0.25, 20);

/** Arrow-button step for the counting interval on the Simulation screen. */
export const SIMULATION_COUNTING_INTERVAL_DELTA = 0.25;

/** Decimal places shown for the counting interval on the Simulation screen. */
export const SIMULATION_COUNTING_INTERVAL_DECIMAL_PLACES = 2;

/** Default counting interval, in seconds. */
export const DEFAULT_COUNTING_INTERVAL = 1;

/**
 * Selectable factors by which the Simulation screen's clock can run faster
 * than real time. Offered only on the Simulation screen — a real source's
 * decays cannot be sped up, so the Device screen leaves this at 1.
 */
export const SPEED_MULTIPLIER_CHOICES = [1, 10, 100];

/** Default speed multiplier: real time. */
export const DEFAULT_SPEED_MULTIPLIER = 1;

/** How many intervals a run collects before recording stops on its own. */
export const SAMPLES_PER_RUN_RANGE = new Range(5, 200);

/** Default run length, in samples. */
export const DEFAULT_SAMPLES_PER_RUN = 20;

/** Mean event rate of the simulated source, in counts per second. */
export const ACTIVITY_RANGE = new Range(1, 200);

/**
 * Default simulated activity, in counts per second.
 *
 * Chosen so the default 1 s interval gives a mean near 20 counts — high enough
 * that the Gaussian limit is a good approximation and the histogram has a
 * recognisable shape, low enough that the Poisson skew is still visible.
 */
export const DEFAULT_ACTIVITY = 20;

/** Histogram bin width in counts, when not chosen automatically. */
export const BIN_WIDTH_RANGE = new Range(1, 20);

// ── Timing guards ─────────────────────────────────────────────────────────────

/**
 * Largest dt the model will act on, in seconds.
 *
 * A backgrounded tab hands back one enormous dt on return. Counting it in full
 * would fabricate intervals for time the source was never observed.
 */
export const MAXIMUM_STEP_DT = 0.5;

/** Settings for common/RadioactivityAndStatisticsControlOptions.ts. */
export const RADIOACTIVITY_AND_STATISTICS_CONTROL_OPTIONS_SETTINGS = {
  /** Slider thumb size width (px). */
  SLIDER_THUMB_SIZE_WIDTH: 12,
  /** Slider thumb size height (px). */
  SLIDER_THUMB_SIZE_HEIGHT: 22,
  /** Standalone slider track size width (px). */
  STANDALONE_SLIDER_TRACK_SIZE_WIDTH: 150,
  /** Standalone slider track size height (px). */
  STANDALONE_SLIDER_TRACK_SIZE_HEIGHT: 3,
  /** Number control slider track size width (px). */
  NUMBER_CONTROL_SLIDER_TRACK_SIZE_WIDTH: 110,
  /** Number control slider track size height (px). */
  NUMBER_CONTROL_SLIDER_TRACK_SIZE_HEIGHT: 3,
  /** Checkbox box width (px). */
  CHECKBOX_BOX_WIDTH: 16,
  /** Radioactivity and statistics number control options scale (dimensionless). */
  RADIOACTIVITY_AND_STATISTICS_NUMBER_CONTROL_OPTIONS_SCALE: 0.75,
  /** Radioactivity and statistics number control options slider padding (px). */
  RADIOACTIVITY_AND_STATISTICS_NUMBER_CONTROL_OPTIONS_SLIDER_PADDING: 4,
  /** Radioactivity and statistics number control options arrow button spacing (px). */
  RADIOACTIVITY_AND_STATISTICS_NUMBER_CONTROL_OPTIONS_ARROW_BUTTON_SPACING: 3,
  /** Radioactivity and statistics number control options vertical spacing (px). */
  RADIOACTIVITY_AND_STATISTICS_NUMBER_CONTROL_OPTIONS_VERTICAL_SPACING: 4,
  /** Radioactivity and statistics checkbox options spacing (px). */
  RADIOACTIVITY_AND_STATISTICS_CHECKBOX_OPTIONS_SPACING: 4,
} as const;

/** Settings for common/RadioactivityAndStatisticsPanel.ts. */
export const RADIOACTIVITY_AND_STATISTICS_PANEL_SETTINGS = {
  /** Options x margin (px). */
  OPTIONS_X_MARGIN: 12,
  /** Options y margin (px). */
  OPTIONS_Y_MARGIN: 10,
} as const;

/** Settings for common/RadioactivityAndStatisticsScreenIcons.ts. */
export const RADIOACTIVITY_AND_STATISTICS_SCREEN_ICONS_SETTINGS = {
  CREATE_SIMULATION_ICON_LINE_DASH_DASH: 16, // px

  CREATE_SIMULATION_ICON_ITEM_3_LINE_WIDTH: 8, // px

  /** Inset of the drawing area from the icon edge. */
  INSET: 60,
  /** Create simulation icon line width (px). */
  CREATE_SIMULATION_ICON_LINE_WIDTH: 5,
  /** Create simulation icon radius (px). */
  CREATE_SIMULATION_ICON_RADIUS: 10,
  /** Point count (count). */
  POINT_COUNT: 60,
  /** Create device icon line width (px). */
  CREATE_DEVICE_ICON_LINE_WIDTH: 8,
} as const;

/** Settings for common/model/GaussianFit.ts. */
export const GAUSSIAN_FIT_SETTINGS = {
  /** Damping increase after a rejected or singular step (dimensionless). */
  DAMPING_INCREASE_FACTOR: 10,
  /** Initial Levenberg–Marquardt damping (dimensionless). */
  INITIAL_DAMPING: 1e-3,
  /** Damping reduction after an accepted step (dimensionless). */
  DAMPING_REDUCTION_FACTOR: 10,
  /** Smallest permitted damping (dimensionless). */
  MIN_DAMPING: 1e-12,
  /** Maximum Levenberg–Marquardt iterations before giving up. */
  MAXIMUM_ITERATIONS: 100,
  /** Relative change in χ² below which the fit is considered converged. */
  CONVERGENCE_TOLERANCE: 1e-8,
  /** Minimum number of bins needed to constrain three parameters. */
  MINIMUM_BINS: 4,
  /** Damping above which the iteration is abandoned as stuck. */
  MAXIMUM_DAMPING: 1e12,
  /** Determinant magnitude below which the normal equations are called singular. */
  SINGULAR_THRESHOLD: 1e-14,
} as const;

/** Settings for common/model/GeigerCountSource.ts. */
export const GEIGER_COUNT_SOURCE_SETTINGS = {
  /** * How often the device is polled, in ms. Fast enough to resolve a one-second counting interval, slow enough to sit well inside a BLE connection interval (the tighter of the two wires). */
  DEFAULT_POLL_INTERVAL_MS: 100,
  /** Consecutive failed reads tolerated before the connection is declared bad. */
  MAXIMUM_CONSECUTIVE_FAILURES: 10,
} as const;

/** Settings for common/model/Histogram.ts. */
export const HISTOGRAM_SETTINGS = {
  /** Minimum sample count before estimating the interquartile range (count). */
  MIN_QUARTILE_SAMPLES: 4,
  /** Upper bound on bin count, so a wild data set cannot allocate a huge array. */
  MAXIMUM_BIN_COUNT: 200,
  /** Minimum target bins (count). */
  MINIMUM_TARGET_BINS: 8,
  /** Most bins the automatic rule will produce, so a long run stays readable. */
  MAXIMUM_TARGET_BINS: 30,
  /** Default point count (count). */
  DEFAULT_POINT_COUNT: 120,
} as const;

/** Settings for common/model/SimulatedCountSource.ts. */
export const SIMULATED_COUNT_SOURCE_SETTINGS = {
  /** * Above this expected number of events per step, Knuth's product algorithm needs too many iterations and a Gaussian approximation is indistinguishable (the relative error of the normal approximation is below a part in a thousand by λ = 30). */
  KNUTH_ALGORITHM_LIMIT: 30,
} as const;

/** Settings for common/model/csvExport.ts. */
export const CSV_EXPORT_SETTINGS = {
  /** Number of decimal places used for derived (non-integer) columns. */
  DECIMAL_PLACES: 4,
} as const;

/** Settings for common/view/AcquisitionPanel.ts. */
export const ACQUISITION_PANEL_SETTINGS = {
  TITLE_NODE_OPTIONS_MAX_WIDTH_OFFSET: 40, // px
  CONTINUOUS_CHECKBOX_MAX_WIDTH_OFFSET: 50, // px
  PROGRESS_TEXT_MAX_WIDTH_OFFSET: 30, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Title node options font size (px). */
  TITLE_NODE_OPTIONS_FONT_SIZE: 13,
  /** Interval control font size (px). */
  INTERVAL_CONTROL_FONT_SIZE: 13,
  /** Samples per run control delta (control/model units). */
  SAMPLES_PER_RUN_CONTROL_DELTA: 5,
  /** Samples per run control font size (count). */
  SAMPLES_PER_RUN_CONTROL_FONT_SIZE: 13,
  /** Continuous checkbox font size (px). */
  CONTINUOUS_CHECKBOX_FONT_SIZE: 13,
  /** Record button font size (px). */
  RECORD_BUTTON_FONT_SIZE: 13,
  /** Stop button font size (px). */
  STOP_BUTTON_FONT_SIZE: 13,
  /** Clear button font size (px). */
  CLEAR_BUTTON_FONT_SIZE: 13,
  /** Export button font size (px). */
  EXPORT_BUTTON_FONT_SIZE: 13,
  /** Progress text font size (px). */
  PROGRESS_TEXT_FONT_SIZE: 12,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/ChartViewPanel.ts. */
export const CHART_VIEW_PANEL_SETTINGS = {
  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Radio group font size (px). */
  RADIO_GROUP_FONT_SIZE: 13,
  /** Radio group max width (px). */
  RADIO_GROUP_MAX_WIDTH: 170,
  /** Radio group spacing (px). */
  RADIO_GROUP_SPACING: 6,
  /** Radio group radius (px). */
  RADIO_GROUP_RADIUS: 7,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/CountRateChartNode.ts. */
export const COUNT_RATE_CHART_NODE_SETTINGS = {
  ITEM_1_SPACING: 4, // px
  ITEM_2_SPACING: 24, // px

  /** Headroom above the highest plotted rate. */
  Y_HEADROOM: 1.2,
  /** Default x range max (control/model units). */
  DEFAULT_X_RANGE_MAX: 20,
  /** Default y range max (control/model units). */
  DEFAULT_Y_RANGE_MAX: 30,
  /** Roughly how many ticks to aim for on each axis. */
  TARGET_TICK_COUNT: 6,
  /** Maximum plotted points (px). */
  MAXIMUM_PLOTTED_POINTS: 1000,
  /** Point plot radius (px). */
  POINT_PLOT_RADIUS: 2.5,
  /** Tick label options font size (px). */
  TICK_LABEL_OPTIONS_FONT_SIZE: 11,
  /** Axis title options font size (px). */
  AXIS_TITLE_OPTIONS_FONT_SIZE: 12,
  /** Legend spacing (px). */
  LEGEND_SPACING: 14,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
  /** Legend entry spacing (px). */
  LEGEND_ENTRY_SPACING: 5,
  /** Legend entry end x (px). */
  LEGEND_ENTRY_END_X: 22,
  /** Legend entry font size (px). */
  LEGEND_ENTRY_FONT_SIZE: 11,
  /** Legend entry max width (px). */
  LEGEND_ENTRY_MAX_WIDTH: 150,
} as const;

/** Settings for common/view/CountRateDisplayNode.ts. */
export const COUNT_RATE_DISPLAY_NODE_SETTINGS = {
  /** Caption font size (px). */
  CAPTION_FONT_SIZE: 14,
  /** Value font size (px). */
  VALUE_FONT_SIZE: 52,
  /** Units font size (px). */
  UNITS_FONT_SIZE: 16,
  /** Interval caption font size (px). */
  INTERVAL_CAPTION_FONT_SIZE: 12,
  /** Interval value font size (px). */
  INTERVAL_VALUE_FONT_SIZE: 16,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 2,
} as const;

/** Settings for common/view/DataTableNode.ts. */
export const DATA_TABLE_NODE_SETTINGS = {
  HEADER_MAX_WIDTH_FACTOR: 0.28, // dimensionless
  CELLS_MAX_WIDTH_FACTOR: 0.28, // dimensionless
  CONSTRUCTOR_MIN_WIDTH_OFFSET: 24, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Header font size (px). */
  HEADER_FONT_SIZE: 11,
  /** Cells font size (px). */
  CELLS_FONT_SIZE: 11,
  /** Empty message font size (px). */
  EMPTY_MESSAGE_FONT_SIZE: 12,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 4,
} as const;

/** Settings for common/view/DistributionControlsPanel.ts. */
export const DISTRIBUTION_CONTROLS_PANEL_SETTINGS = {
  CURVE_CHECKBOX_MAX_WIDTH_OFFSET: 55, // px
  AUTO_BIN_WIDTH_CHECKBOX_MAX_WIDTH_OFFSET: 55, // px
  BIN_WIDTH_CONTROL_MAX_WIDTH_OFFSET: 40, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Curve checkbox font size (px). */
  CURVE_CHECKBOX_FONT_SIZE: 12,
  /** Auto bin width checkbox font size (px). */
  AUTO_BIN_WIDTH_CHECKBOX_FONT_SIZE: 12,
  /** Bin width control font size (px). */
  BIN_WIDTH_CONTROL_FONT_SIZE: 12,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 6,
} as const;

/** Settings for common/view/HistogramNode.ts. */
export const HISTOGRAM_NODE_SETTINGS = {
  PLOT_WITH_AXES_ITEM_2_SPACING: 24, // px

  /** Fraction of headroom left above the tallest mark. */
  Y_HEADROOM: 1.15,
  /** Default x range max (control/model units). */
  DEFAULT_X_RANGE_MAX: 40,
  /** Default y range max (control/model units). */
  DEFAULT_Y_RANGE_MAX: 10,
  /** Roughly how many ticks to aim for on each axis. */
  TARGET_TICK_COUNT: 8,
  /** Tick label options font size (px). */
  TICK_LABEL_OPTIONS_FONT_SIZE: 11,
  /** Axis title options font size (px). */
  AXIS_TITLE_OPTIONS_FONT_SIZE: 12,
  /** Plot with axes spacing (px). */
  PLOT_WITH_AXES_SPACING: 4,
  /** Legend spacing (px). */
  LEGEND_SPACING: 14,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
  /** Default point count (count). */
  DEFAULT_POINT_COUNT: 120,
  /** Swatch end x (px). */
  SWATCH_END_X: 22,
  /** Legend entry spacing (px). */
  LEGEND_ENTRY_SPACING: 5,
  /** Legend entry font size (px). */
  LEGEND_ENTRY_FONT_SIZE: 11,
  /** Legend entry max width (px). */
  LEGEND_ENTRY_MAX_WIDTH: 150,
} as const;

/** Settings for common/view/SourcePanel.ts. */
export const SOURCE_PANEL_SETTINGS = {
  ACTIVITY_CONTROL_MAX_WIDTH_OFFSET: 40, // px
  SPEED_LABEL_TEXT_MAX_WIDTH_OFFSET: 40, // px
  STATUS_ROW_MAX_WIDTH_OFFSET: 60, // px
  DEVICE_NAME_TEXT_MAX_WIDTH_OFFSET: 30, // px
  UNAVAILABLE_TEXT_MAX_WIDTH_OFFSET: 30, // px
  ERROR_TEXT_MAX_WIDTH_OFFSET: 30, // px

  /** Radius of the connection-status dot. */
  STATUS_DOT_RADIUS: 5,
  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
  /** Activity control font size (px). */
  ACTIVITY_CONTROL_FONT_SIZE: 13,
  /** Speed label text font size (px). */
  SPEED_LABEL_TEXT_FONT_SIZE: 13,
  /** Speed radio group font size (px). */
  SPEED_RADIO_GROUP_FONT_SIZE: 13,
  /** Speed radio group spacing (px). */
  SPEED_RADIO_GROUP_SPACING: 10,
  /** Speed radio group radius (px). */
  SPEED_RADIO_GROUP_RADIUS: 7,
  /** Create simulated controls spacing (px). */
  CREATE_SIMULATED_CONTROLS_SPACING: 6,
  /** Status row spacing (px). */
  STATUS_ROW_SPACING: 6,
  /** Status row font size (px). */
  STATUS_ROW_FONT_SIZE: 13,
  /** Device name text font size (px). */
  DEVICE_NAME_TEXT_FONT_SIZE: 11,
  /** Disconnect button font size (px). */
  DISCONNECT_BUTTON_FONT_SIZE: 13,
  /** Unavailable text font size (px). */
  UNAVAILABLE_TEXT_FONT_SIZE: 11,
  /** Error text font size (px). */
  ERROR_TEXT_FONT_SIZE: 11,
  /** Diagnostics spacing (px). */
  DIAGNOSTICS_SPACING: 4,
  /** Diagnostics font size (px). */
  DIAGNOSTICS_FONT_SIZE: 11,
  /** Create geiger controls spacing (px). */
  CREATE_GEIGER_CONTROLS_SPACING: 6,
  /** Create connect button font size (px). */
  CREATE_CONNECT_BUTTON_FONT_SIZE: 13,
} as const;

/** Settings for common/view/StatisticsPanel.ts. */
export const STATISTICS_PANEL_SETTINGS = {
  LABEL_MAX_WIDTH_FACTOR: 0.62, // dimensionless

  /** Decimal places for statistics; counting data rarely justifies more. */
  STATISTIC_DECIMALS: 2,
  /** Label font size (px). */
  LABEL_FONT_SIZE: 13,
  /** Value font size (px). */
  VALUE_FONT_SIZE: 14,
  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Grid x spacing (px). */
  GRID_X_SPACING: 12,
  /** Grid y spacing (px). */
  GRID_Y_SPACING: 5,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 6,
} as const;

/** Settings for preferences/RadioactivityAndStatisticsPreferencesNode.ts. */
export const RADIOACTIVITY_AND_STATISTICS_PREFERENCES_NODE_SETTINGS = {
  /** Header font size (px). */
  HEADER_FONT_SIZE: 18,
  /** Label options font size (px). */
  LABEL_OPTIONS_FONT_SIZE: 14,
  /** Label options max width (px). */
  LABEL_OPTIONS_MAX_WIDTH: 420,
  /** Description options font size (px). */
  DESCRIPTION_OPTIONS_FONT_SIZE: 12,
  /** Description options max width (px). */
  DESCRIPTION_OPTIONS_MAX_WIDTH: 460,
  /** Checkbox options spacing (px). */
  CHECKBOX_OPTIONS_SPACING: 8,
  /** Tube voltage control y spacing (px). */
  TUBE_VOLTAGE_CONTROL_Y_SPACING: 6,
  /** Tube voltage control font size (px). */
  TUBE_VOLTAGE_CONTROL_FONT_SIZE: 14,
  /** Tube voltage control max width (px). */
  TUBE_VOLTAGE_CONTROL_MAX_WIDTH: 280,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 12,
} as const;

/** Component dimensions in px; ratios and control steps are dimensionless; precision counts digits. */
export const RADIOACTIVITY_AND_STATISTICS_QUERY_PARAMETERS_SETTINGS = {
  RADIOACTIVITY_AND_STATISTICS_QUERY_PARAMETERS_DEFAULT_VALUE: 100, // dimensionless
} as const;

RadioactivityAndStatisticsNamespace.register("RadioactivityAndStatisticsConstants", {
  SCREEN_VIEW_MARGIN,
  PANEL_CORNER_RADIUS,
  PANEL_SPACING,
  CONTROL_PANEL_WIDTH,
  HISTOGRAM_CHART_SIZE,
  RATE_CHART_SIZE,
  CURVE_LINE_WIDTH,
  CURVE_DASH_PATTERNS,
  HISTOGRAM_BAR_GAP,
  TABLE_VISIBLE_ROWS,
  TABLE_ROW_HEIGHT,
  TABLE_WIDTH,
  COUNTING_INTERVAL_RANGE,
  COUNTING_INTERVAL_DELTA,
  COUNTING_INTERVAL_DECIMAL_PLACES,
  SIMULATION_COUNTING_INTERVAL_RANGE,
  SIMULATION_COUNTING_INTERVAL_DELTA,
  SIMULATION_COUNTING_INTERVAL_DECIMAL_PLACES,
  DEFAULT_COUNTING_INTERVAL,
  SPEED_MULTIPLIER_CHOICES,
  DEFAULT_SPEED_MULTIPLIER,
  SAMPLES_PER_RUN_RANGE,
  DEFAULT_SAMPLES_PER_RUN,
  ACTIVITY_RANGE,
  DEFAULT_ACTIVITY,
  BIN_WIDTH_RANGE,
  MAXIMUM_STEP_DT,
});

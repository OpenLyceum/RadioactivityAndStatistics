/**
 * radioactivityAndStatisticsQueryParameters.ts
 *
 * Sim-specific startup query parameters. This is the single place where every
 * sim-specific query parameter is declared and documented. Public-facing
 * parameters (intended for end users / sharing links) must set `public: true`.
 *
 * ── How to add a query parameter ──────────────────────────────────────────────
 * 1. Add an entry below with a `type`, `defaultValue`, and (if user-facing)
 *    `public: true`. Add `isValidValue` to bound numeric ranges.
 * 2. If it should also be user-editable at runtime, surface it as a preference
 *    in RadioactivityAndStatisticsPreferencesModel (initialize that Property from this query parameter).
 *
 * Usage: append e.g. `?showDiagnostics=true` to the sim URL.
 */

import { logGlobal } from "scenerystack/phet-core";
import { QueryStringMachine } from "scenerystack/query-string-machine";
import { TUBE_VOLTAGE_CONTROL_RANGE } from "../common/hardware/PascoProtocol.js";
import RadioactivityAndStatisticsNamespace from "../RadioactivityAndStatisticsNamespace.js";

const radioactivityAndStatisticsQueryParameters = QueryStringMachine.getAll({
  /**
   * Shows the raw CountRate register and GM tube voltage in the source panel.
   *
   * Useful for confirming a connected counter is reporting sanely: a healthy
   * GM tube sits near 500 V.
   */
  showDiagnostics: {
    type: "boolean",
    defaultValue: false,
    public: true,
  },

  /**
   * Whether a connected Geiger counter may beep on each count.
   *
   * Surfaced in Preferences → Simulation; applied over the open link when a counter is
   * connected.
   */
  beepEnabled: {
    type: "boolean",
    defaultValue: true,
    public: true,
  },

  /**
   * Offers the "Connect via USB" button on the Geiger counter screen.
   *
   * Off by default, and deliberately not `public`. The counter's USB port does
   * present a reachable WebUSB interface — "Pasco USB Bridge", vendor 0x0945,
   * class 0xff with bulk endpoints, and `claimInterface` succeeds — but its
   * data path stays in loopback: every packet written comes back byte-identical,
   * and nothing opens it that can be found by inspection. See
   * doc/implementation-notes.md. Until that is solved the button would fail for
   * every user, so only someone deliberately working on the USB path sees it.
   */
  usbTransport: {
    type: "boolean",
    defaultValue: false,
  },

  /**
   * G-M tube bias setpoint in volts for a connected Geiger counter.
   *
   * Surfaced as a slider in Preferences → Simulation. Range matches SPARKvue's
   * Geiger control panel.
   */
  tubeVoltage: {
    type: "number",
    defaultValue: TUBE_VOLTAGE_CONTROL_RANGE.default,
    public: true,
  },

  /**
   * Shows the "Samples per run" slider on the acquisition panel, letting the
   * student change how many samples a bounded run collects.
   *
   * Off by default: with the slider hidden, every run collects the same fixed
   * DEFAULT_SAMPLES_PER_RUN, which keeps the run length from being a variable
   * a student has to think about before the statistics itself makes sense.
   *
   * Surfaced in Preferences → Simulation.
   */
  showSamplesPerRunControl: {
    type: "boolean",
    defaultValue: false,
    public: true,
  },

  /**
   * Byte-level tracing for the hardware transports. Developer-only; not public.
   * `debugBluetooth` is the older name for the same switch.
   */
  debugTransport: {
    type: "boolean" as const,
    defaultValue: false,
  },
  debugBluetooth: {
    type: "boolean" as const,
    defaultValue: false,
  },

  /**
   * How often a connected Geiger counter is polled, in milliseconds.
   * Developer-only; not public. Used to see whether CountRate scales with the gap between reads.
   */
  pollIntervalMs: {
    type: "number" as const,
    defaultValue: 100,
    isValidValue: (value: number) => Number.isFinite(value) && value > 0,
  },
});

RadioactivityAndStatisticsNamespace.register(
  "radioactivityAndStatisticsQueryParameters",
  radioactivityAndStatisticsQueryParameters,
);

// Log query parameters (for the console / PhET-iO).
logGlobal("phet.chipper.queryParameters");

export default radioactivityAndStatisticsQueryParameters;

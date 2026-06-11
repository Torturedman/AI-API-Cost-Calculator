import { describe, expect, it } from "vitest";
import { parseUsageInput } from "../lib/validation";

describe("parseUsageInput", () => {
  it("parses valid integer usage values", () => {
    const result = parseUsageInput({
      inputTokens: "1000",
      outputTokens: "500",
      requestsPerDay: "100",
      daysPerMonth: "30"
    });

    expect(result).toEqual({
      ok: true,
      usage: {
        inputTokens: 1000,
        outputTokens: 500,
        requestsPerDay: 100,
        daysPerMonth: 30
      },
      errors: {}
    });
  });

  it("accepts documented minimum and maximum values", () => {
    const result = parseUsageInput({
      inputTokens: "0",
      outputTokens: "1000000000",
      requestsPerDay: "1000000",
      daysPerMonth: "31"
    });

    expect(result.ok).toBe(true);
  });

  it("rejects blank, decimal, negative, non-numeric, and out-of-range values", () => {
    const result = parseUsageInput({
      inputTokens: "",
      outputTokens: "12.5",
      requestsPerDay: "-1",
      daysPerMonth: "32"
    });

    expect(result).toEqual({
      ok: false,
      usage: null,
      errors: {
        inputTokens: true,
        outputTokens: true,
        requestsPerDay: true,
        daysPerMonth: true
      }
    });
  });
});

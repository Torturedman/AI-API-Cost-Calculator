import { describe, expect, it } from "vitest";
import { formatUsd } from "../lib/format";
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
      outputTokens: "10000000",
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
        inputTokens: "Enter an integer from 0 to 10,000,000.",
        outputTokens: "Enter an integer from 0 to 10,000,000.",
        requestsPerDay: "Enter an integer from 0 to 1,000,000.",
        daysPerMonth: "Enter an integer from 1 to 31."
      }
    });
  });
});

describe("formatUsd", () => {
  it("uses 2 decimals for normal currency amounts", () => {
    expect(formatUsd(30)).toBe("$30.00");
    expect(formatUsd(1.234)).toBe("$1.23");
  });

  it("uses up to 6 decimals for tiny currency amounts", () => {
    expect(formatUsd(0.0001234)).toBe("$0.000123");
    expect(formatUsd(0.009999)).toBe("$0.009999");
  });
});

import { describe, expect, it } from "vitest";
import { formatMonthlyDifference, formatUsd } from "../lib/format";

describe("formatUsd", () => {
  it("uses 2 decimals for normal currency amounts", () => {
    expect(formatUsd(30)).toBe("$30.00");
    expect(formatUsd(1.234)).toBe("$1.23");
  });

  it("uses up to 6 decimals for tiny currency amounts", () => {
    expect(formatUsd(0.0001234)).toBe("$0.000123");
    expect(formatUsd(0.009999)).toBe("$0.009999");
  });

  it("uses compact suffixes for very large currency amounts", () => {
    expect(formatUsd(1_500_000)).toBe("$1.50M");
    expect(formatUsd(2_400_000_000)).toBe("$2.40B");
    expect(formatUsd(1_050_000_000_000)).toBe("$1.05T");
  });
});

describe("formatMonthlyDifference", () => {
  it("formats the cheapest model without a plus prefix", () => {
    expect(formatMonthlyDifference(0.9, 0.9)).toBe("$0.00");
  });

  it("formats models above the cheapest baseline with a plus prefix", () => {
    expect(formatMonthlyDifference(2.475, 0.9)).toBe("+$1.58");
  });

  it("formats large monthly differences compactly", () => {
    expect(formatMonthlyDifference(2_500_000, 1_000_000)).toBe("+$1.50M");
  });

  it("does not show negative differences if values are passed out of order", () => {
    expect(formatMonthlyDifference(0.5, 0.9)).toBe("$0.00");
  });
});

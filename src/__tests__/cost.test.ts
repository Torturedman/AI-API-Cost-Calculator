import { describe, expect, it } from "vitest";
import type { ModelPrice } from "../data/models";
import {
  calculateAllModelCosts,
  calculateModelCost,
  sortCostsByMonthlyCost,
  type UsageEstimate
} from "../lib/cost";

const baseModel: ModelPrice = {
  id: "example-model",
  provider: "OpenAI",
  displayName: "Example Model",
  officialModelName: "Example Model",
  inputUsdPerMillion: 2.5,
  outputUsdPerMillion: 15,
  pricingUnit: "USD_PER_1M_TOKENS",
  pricingScope: "Test scope.",
  sourceUrl: "https://example.com/pricing",
  sourceLabel: "Example pricing",
  checkedAt: "2026-06-10",
  excludedVariants: ["batch"],
  notes: "Test model."
};

const usage: UsageEstimate = {
  inputTokens: 1000,
  outputTokens: 500,
  requestsPerDay: 100,
  daysPerMonth: 30
};

describe("calculateModelCost", () => {
  it("estimates per-request, daily, and monthly token cost", () => {
    const result = calculateModelCost(baseModel, usage);

    expect(result.perRequestUsd).toBeCloseTo(0.01, 6);
    expect(result.dailyUsd).toBeCloseTo(1, 6);
    expect(result.monthlyUsd).toBeCloseTo(30, 6);
    expect(result.model).toBe(baseModel);
  });
});

describe("calculateAllModelCosts", () => {
  it("calculates a cost row for every model", () => {
    const cheaperModel = {
      ...baseModel,
      id: "cheaper-model",
      inputUsdPerMillion: 1,
      outputUsdPerMillion: 1
    };

    const results = calculateAllModelCosts([baseModel, cheaperModel], usage);

    expect(results).toHaveLength(2);
    expect(results.map((result) => result.model.id)).toEqual([
      "example-model",
      "cheaper-model"
    ]);
  });
});

describe("sortCostsByMonthlyCost", () => {
  it("sorts from cheapest to most expensive without mutating input", () => {
    const expensive = calculateModelCost(baseModel, usage);
    const cheap = calculateModelCost(
      {
        ...baseModel,
        id: "cheap-model",
        inputUsdPerMillion: 0.1,
        outputUsdPerMillion: 0.2
      },
      usage
    );

    const original = [expensive, cheap];
    const sorted = sortCostsByMonthlyCost(original);

    expect(sorted.map((result) => result.model.id)).toEqual([
      "cheap-model",
      "example-model"
    ]);
    expect(original.map((result) => result.model.id)).toEqual([
      "example-model",
      "cheap-model"
    ]);
  });
});

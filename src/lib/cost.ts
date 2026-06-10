import type { ModelPrice } from "../data/models";

export interface UsageEstimate {
  inputTokens: number;
  outputTokens: number;
  requestsPerDay: number;
  daysPerMonth: number;
}

export interface ModelCostEstimate {
  model: ModelPrice;
  perRequestUsd: number;
  dailyUsd: number;
  monthlyUsd: number;
}

export function calculateModelCost(
  model: ModelPrice,
  usage: UsageEstimate
): ModelCostEstimate {
  const perRequestUsd =
    (usage.inputTokens * model.inputUsdPerMillion +
      usage.outputTokens * model.outputUsdPerMillion) /
    1_000_000;
  const dailyUsd = perRequestUsd * usage.requestsPerDay;
  const monthlyUsd = dailyUsd * usage.daysPerMonth;

  return {
    model,
    perRequestUsd,
    dailyUsd,
    monthlyUsd
  };
}

export function calculateAllModelCosts(
  models: ModelPrice[],
  usage: UsageEstimate
): ModelCostEstimate[] {
  return models.map((model) => calculateModelCost(model, usage));
}

export function sortCostsByMonthlyCost(
  results: ModelCostEstimate[]
): ModelCostEstimate[] {
  return [...results].sort((left, right) => left.monthlyUsd - right.monthlyUsd);
}

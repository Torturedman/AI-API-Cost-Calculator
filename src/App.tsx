import { useMemo, useState } from "react";
import { EstimatorForm } from "./components/EstimatorForm";
import { ModelTable } from "./components/ModelTable";
import { MODEL_PRICES } from "./data/models";
import { calculateAllModelCosts, sortCostsByMonthlyCost } from "./lib/cost";
import { formatUsd } from "./lib/format";
import {
  parseUsageInput,
  type UsageField,
  type UsageInputValues
} from "./lib/validation";

const defaultInputValues: UsageInputValues = {
  inputTokens: "1000",
  outputTokens: "500",
  requestsPerDay: "100",
  daysPerMonth: "30"
};

function uniqueSources() {
  return Array.from(
    new Map(
      MODEL_PRICES.map((model) => [
        model.sourceUrl,
        {
          label: model.sourceLabel,
          url: model.sourceUrl,
          checkedAt: model.checkedAt
        }
      ])
    ).values()
  );
}

export function App() {
  const [inputValues, setInputValues] =
    useState<UsageInputValues>(defaultInputValues);
  const parsedUsage = parseUsageInput(inputValues);
  const results = useMemo(() => {
    if (!parsedUsage.ok) {
      return [];
    }

    return sortCostsByMonthlyCost(
      calculateAllModelCosts(MODEL_PRICES, parsedUsage.usage)
    );
  }, [parsedUsage]);
  const cheapest = results[0] ?? null;
  const sources = uniqueSources();

  function handleInputChange(field: UsageField, value: string) {
    setInputValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <main className="app-shell">
      <section className="intro-panel">
        <p className="eyebrow">Official text token pricing</p>
        <h1>AI API Cost Calculator</h1>
        <p className="lede">
          Estimate OpenAI, Anthropic Claude, and Google Gemini API spend from a
          simple usage scenario. Prices are normalized to USD per million tokens.
        </p>
      </section>

      <section className="calculator-grid" aria-label="Cost calculator">
        <div className="control-panel">
          <h2>Usage scenario</h2>
          <EstimatorForm
            errors={parsedUsage.errors}
            onChange={handleInputChange}
            values={inputValues}
          />
        </div>

        <div className="results-panel">
          {parsedUsage.ok && cheapest ? (
            <>
              <section className="summary" aria-label="Cheapest estimate">
                <span>Cheapest estimate</span>
                <strong>{cheapest.model.displayName}</strong>
                <b>{formatUsd(cheapest.monthlyUsd)}</b>
                <small>
                  {`${parsedUsage.usage.requestsPerDay.toLocaleString(
                    "en-US"
                  )} requests/day across ${
                    parsedUsage.usage.daysPerMonth
                  } usage days`}
                </small>
              </section>

              <ModelTable results={results} />
            </>
          ) : (
            <section className="summary invalid" aria-live="polite">
              <span>Estimate paused</span>
              <strong>Fix the highlighted inputs to refresh estimates.</strong>
            </section>
          )}

          <section className="source-note" aria-label="Pricing sources">
            <h2>Sources</h2>
            <p>
              Pricing checked on {sources[0]?.checkedAt}. This app excludes
              cached, batch, priority, regional, media, and enterprise pricing.
            </p>
            <ul>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

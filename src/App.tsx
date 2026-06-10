import { useMemo, useState } from "react";
import { EstimatorForm } from "./components/EstimatorForm";
import { ModelTable } from "./components/ModelTable";
import { MODEL_PRICES } from "./data/models";
import { appCopy, type Language } from "./i18n";
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
  const [language, setLanguage] = useState<Language>("en");
  const [inputValues, setInputValues] =
    useState<UsageInputValues>(defaultInputValues);
  const copy = appCopy[language];
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
        <div className="intro-top">
          <p className="eyebrow">{copy.eyebrow}</p>
          <div className="language-toggle" aria-label={copy.languageToggleLabel}>
            {(["en", "zh"] as const).map((option) => (
              <button
                aria-pressed={language === option}
                key={option}
                onClick={() => setLanguage(option)}
                type="button"
              >
                {copy.languageOptions[option]}
              </button>
            ))}
          </div>
        </div>
        <h1>{copy.title}</h1>
        <p className="lede">{copy.lede}</p>
      </section>

      <section className="calculator-grid" aria-label={copy.calculatorAriaLabel}>
        <div className="control-panel">
          <h2>{copy.usageTitle}</h2>
          <EstimatorForm
            copy={{
              ariaLabel: copy.formAriaLabel,
              fields: copy.fields
            }}
            errors={parsedUsage.errors}
            onChange={handleInputChange}
            values={inputValues}
          />
        </div>

        <div className="results-panel">
          {parsedUsage.ok && cheapest ? (
            <>
              <section className="summary" aria-label={copy.cheapestAriaLabel}>
                <span>{copy.cheapestLabel}</span>
                <strong>{cheapest.model.displayName}</strong>
                <b>{formatUsd(cheapest.monthlyUsd)}</b>
                <small>
                  {copy.usageSummary(
                    parsedUsage.usage.requestsPerDay,
                    parsedUsage.usage.daysPerMonth
                  )}
                </small>
              </section>

              <ModelTable copy={copy.table} results={results} />
            </>
          ) : (
            <section className="summary invalid" aria-live="polite">
              <span>{copy.invalidLabel}</span>
              <strong>{copy.invalidMessage}</strong>
            </section>
          )}

          <section className="source-note" aria-label={copy.sourcesAriaLabel}>
            <h2>{copy.sourcesTitle}</h2>
            <p>{copy.sourcesNote(sources[0]?.checkedAt)}</p>
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

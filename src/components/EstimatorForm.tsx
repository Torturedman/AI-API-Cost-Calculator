import type { UsageErrors, UsageField, UsageInputValues } from "../lib/validation";

interface EstimatorFormProps {
  values: UsageInputValues;
  errors: UsageErrors;
  onChange: (field: UsageField, value: string) => void;
}

const fields: Array<{
  name: UsageField;
  label: string;
  helper: string;
}> = [
  {
    name: "inputTokens",
    label: "Average input tokens",
    helper: "Prompt tokens per request"
  },
  {
    name: "outputTokens",
    label: "Average output tokens",
    helper: "Completion tokens per request"
  },
  {
    name: "requestsPerDay",
    label: "Requests per day",
    helper: "Expected daily volume"
  },
  {
    name: "daysPerMonth",
    label: "Usage days per month",
    helper: "1 to 31 days"
  }
];

export function EstimatorForm({ values, errors, onChange }: EstimatorFormProps) {
  return (
    <form className="estimator-form" aria-label="Usage inputs">
      {fields.map((field) => {
        const error = errors[field.name];
        const errorId = `${field.name}-error`;
        const helperId = `${field.name}-helper`;

        return (
          <label className="input-field" key={field.name}>
            <span>{field.label}</span>
            <input
              aria-label={field.label}
              aria-describedby={error ? errorId : helperId}
              aria-invalid={error ? "true" : "false"}
              inputMode="numeric"
              min={field.name === "daysPerMonth" ? 1 : 0}
              onChange={(event) => onChange(field.name, event.target.value)}
              type="text"
              value={values[field.name]}
            />
            {error ? (
              <span className="field-error" id={errorId}>
                {error}
              </span>
            ) : (
              <span className="field-helper" id={helperId}>
                {field.helper}
              </span>
            )}
          </label>
        );
      })}
    </form>
  );
}

import type { UsageErrors, UsageField, UsageInputValues } from "../lib/validation";

interface EstimatorFormProps {
  values: UsageInputValues;
  errors: UsageErrors;
  onChange: (field: UsageField, value: string) => void;
  copy: {
    ariaLabel: string;
    fields: Record<
      UsageField,
      {
        label: string;
        helper: string;
        error: string;
      }
    >;
  };
}

const fields: UsageField[] = [
  "inputTokens",
  "outputTokens",
  "requestsPerDay",
  "daysPerMonth"
];

export function EstimatorForm({
  values,
  errors,
  onChange,
  copy
}: EstimatorFormProps) {
  return (
    <form className="estimator-form" aria-label={copy.ariaLabel}>
      {fields.map((field) => {
        const fieldCopy = copy.fields[field];
        const error = errors[field];
        const errorId = `${field}-error`;
        const helperId = `${field}-helper`;

        return (
          <label className="input-field" key={field}>
            <span>{fieldCopy.label}</span>
            <input
              aria-label={fieldCopy.label}
              aria-describedby={error ? errorId : helperId}
              aria-invalid={error ? "true" : "false"}
              inputMode="numeric"
              min={field === "daysPerMonth" ? 1 : 0}
              onChange={(event) => onChange(field, event.target.value)}
              type="text"
              value={values[field]}
            />
            {error ? (
              <span className="field-error" id={errorId}>
                {fieldCopy.error}
              </span>
            ) : (
              <span className="field-helper" id={helperId}>
                {fieldCopy.helper}
              </span>
            )}
          </label>
        );
      })}
    </form>
  );
}

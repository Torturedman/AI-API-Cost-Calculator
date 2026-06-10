import type { UsageEstimate } from "./cost";

export interface UsageInputValues {
  inputTokens: string;
  outputTokens: string;
  requestsPerDay: string;
  daysPerMonth: string;
}

export type UsageField = keyof UsageInputValues;

export type UsageErrors = Partial<Record<UsageField, string>>;

export type UsageParseResult =
  | {
      ok: true;
      usage: UsageEstimate;
      errors: UsageErrors;
    }
  | {
      ok: false;
      usage: null;
      errors: UsageErrors;
    };

const fieldRules: Record<
  UsageField,
  {
    min: number;
    max: number;
    message: string;
  }
> = {
  inputTokens: {
    min: 0,
    max: 10_000_000,
    message: "Enter an integer from 0 to 10,000,000."
  },
  outputTokens: {
    min: 0,
    max: 10_000_000,
    message: "Enter an integer from 0 to 10,000,000."
  },
  requestsPerDay: {
    min: 0,
    max: 1_000_000,
    message: "Enter an integer from 0 to 1,000,000."
  },
  daysPerMonth: {
    min: 1,
    max: 31,
    message: "Enter an integer from 1 to 31."
  }
};

function parseIntegerField(rawValue: string, field: UsageField): number | null {
  const value = rawValue.trim();
  const rule = fieldRules[field];

  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < rule.min || parsed > rule.max) {
    return null;
  }

  return parsed;
}

export function parseUsageInput(values: UsageInputValues): UsageParseResult {
  const errors: UsageErrors = {};
  const parsedValues = {} as Record<UsageField, number>;

  for (const field of Object.keys(fieldRules) as UsageField[]) {
    const parsed = parseIntegerField(values[field], field);

    if (parsed === null) {
      errors[field] = fieldRules[field].message;
    } else {
      parsedValues[field] = parsed;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      usage: null,
      errors
    };
  }

  return {
    ok: true,
    usage: {
      inputTokens: parsedValues.inputTokens,
      outputTokens: parsedValues.outputTokens,
      requestsPerDay: parsedValues.requestsPerDay,
      daysPerMonth: parsedValues.daysPerMonth
    },
    errors
  };
}

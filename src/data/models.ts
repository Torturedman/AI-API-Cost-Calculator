export type ProviderName = "OpenAI" | "Anthropic" | "Google Gemini";

export type PricingUnit = "USD_PER_1M_TOKENS";

export interface ModelPrice {
  id: string;
  provider: ProviderName;
  displayName: string;
  officialModelName: string;
  inputUsdPerMillion: number;
  outputUsdPerMillion: number;
  pricingUnit: PricingUnit;
  pricingScope: string;
  sourceUrl: string;
  sourceLabel: string;
  checkedAt: string;
  excludedVariants: string[];
  notes: string;
}

const checkedAt = "2026-06-10";

const openAiSource = "https://platform.openai.com/docs/pricing";
const anthropicSource =
  "https://platform.claude.com/docs/en/about-claude/pricing";
const geminiSource = "https://ai.google.dev/gemini-api/docs/pricing";

export const MODEL_PRICES: ModelPrice[] = [
  {
    id: "openai-gpt-5-5",
    provider: "OpenAI",
    displayName: "GPT-5.5",
    officialModelName: "GPT-5.5",
    inputUsdPerMillion: 5,
    outputUsdPerMillion: 30,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Standard short-context text tokens.",
    sourceUrl: openAiSource,
    sourceLabel: "OpenAI API pricing",
    checkedAt,
    excludedVariants: [
      "cached input",
      "batch",
      "flex",
      "priority",
      "regional",
      "media",
      "enterprise"
    ],
    notes: "Uses standard text input and output prices only."
  },
  {
    id: "openai-gpt-5-4-mini",
    provider: "OpenAI",
    displayName: "GPT-5.4 mini",
    officialModelName: "GPT-5.4 mini",
    inputUsdPerMillion: 0.75,
    outputUsdPerMillion: 4.5,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Standard short-context text tokens.",
    sourceUrl: openAiSource,
    sourceLabel: "OpenAI API pricing",
    checkedAt,
    excludedVariants: [
      "cached input",
      "batch",
      "flex",
      "priority",
      "regional",
      "media",
      "enterprise"
    ],
    notes: "Uses standard text input and output prices only."
  },
  {
    id: "openai-gpt-5-4-nano",
    provider: "OpenAI",
    displayName: "GPT-5.4 nano",
    officialModelName: "GPT-5.4 nano",
    inputUsdPerMillion: 0.2,
    outputUsdPerMillion: 1.25,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Standard short-context text tokens.",
    sourceUrl: openAiSource,
    sourceLabel: "OpenAI API pricing",
    checkedAt,
    excludedVariants: [
      "cached input",
      "batch",
      "flex",
      "priority",
      "regional",
      "media",
      "enterprise"
    ],
    notes: "Uses standard text input and output prices only."
  },
  {
    id: "anthropic-claude-opus-4-8",
    provider: "Anthropic",
    displayName: "Claude Opus 4.8",
    officialModelName: "Claude Opus 4.8",
    inputUsdPerMillion: 5,
    outputUsdPerMillion: 25,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Base text tokens.",
    sourceUrl: anthropicSource,
    sourceLabel: "Anthropic Claude pricing",
    checkedAt,
    excludedVariants: ["prompt caching", "batch", "tool-use", "media", "enterprise"],
    notes: "Uses base input token and output token prices only."
  },
  {
    id: "anthropic-claude-sonnet-4-6",
    provider: "Anthropic",
    displayName: "Claude Sonnet 4.6",
    officialModelName: "Claude Sonnet 4.6",
    inputUsdPerMillion: 3,
    outputUsdPerMillion: 15,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Base text tokens.",
    sourceUrl: anthropicSource,
    sourceLabel: "Anthropic Claude pricing",
    checkedAt,
    excludedVariants: ["prompt caching", "batch", "tool-use", "media", "enterprise"],
    notes: "Uses base input token and output token prices only."
  },
  {
    id: "anthropic-claude-haiku-4-5",
    provider: "Anthropic",
    displayName: "Claude Haiku 4.5",
    officialModelName: "Claude Haiku 4.5",
    inputUsdPerMillion: 1,
    outputUsdPerMillion: 5,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Base text tokens.",
    sourceUrl: anthropicSource,
    sourceLabel: "Anthropic Claude pricing",
    checkedAt,
    excludedVariants: ["prompt caching", "batch", "tool-use", "media", "enterprise"],
    notes: "Uses base input token and output token prices only."
  },
  {
    id: "google-gemini-2-5-pro",
    provider: "Google Gemini",
    displayName: "Gemini 2.5 Pro",
    officialModelName: "Gemini 2.5 Pro",
    inputUsdPerMillion: 1.25,
    outputUsdPerMillion: 10,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Text prompts at or below 200k tokens.",
    sourceUrl: geminiSource,
    sourceLabel: "Google Gemini API pricing",
    checkedAt,
    excludedVariants: [
      "cached input",
      "long-context tier over 200k tokens",
      "grounding",
      "media",
      "enterprise"
    ],
    notes: "Uses the lower text-token tier for prompts at or below 200k tokens."
  },
  {
    id: "google-gemini-2-5-flash",
    provider: "Google Gemini",
    displayName: "Gemini 2.5 Flash",
    officialModelName: "Gemini 2.5 Flash",
    inputUsdPerMillion: 0.3,
    outputUsdPerMillion: 2.5,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Text/image/video prompts and text output.",
    sourceUrl: geminiSource,
    sourceLabel: "Google Gemini API pricing",
    checkedAt,
    excludedVariants: ["cached input", "grounding", "media output", "enterprise"],
    notes: "Uses text output pricing and excludes non-text output modes."
  },
  {
    id: "google-gemini-2-5-flash-lite",
    provider: "Google Gemini",
    displayName: "Gemini 2.5 Flash-Lite",
    officialModelName: "Gemini 2.5 Flash-Lite",
    inputUsdPerMillion: 0.1,
    outputUsdPerMillion: 0.4,
    pricingUnit: "USD_PER_1M_TOKENS",
    pricingScope: "Text/image/video prompts and text output.",
    sourceUrl: geminiSource,
    sourceLabel: "Google Gemini API pricing",
    checkedAt,
    excludedVariants: ["cached input", "grounding", "media output", "enterprise"],
    notes: "Uses text output pricing and excludes non-text output modes."
  }
];

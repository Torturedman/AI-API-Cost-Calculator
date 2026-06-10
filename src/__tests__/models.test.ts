import { describe, expect, it } from "vitest";
import { MODEL_PRICES } from "../data/models";

describe("MODEL_PRICES", () => {
  it("contains the verified model set from the pricing source audit", () => {
    expect(MODEL_PRICES).toHaveLength(9);
    expect(MODEL_PRICES.map((model) => model.provider)).toEqual([
      "OpenAI",
      "OpenAI",
      "OpenAI",
      "Anthropic",
      "Anthropic",
      "Anthropic",
      "Google Gemini",
      "Google Gemini",
      "Google Gemini"
    ]);
  });

  it("uses unique stable ids and numeric token prices", () => {
    const ids = new Set(MODEL_PRICES.map((model) => model.id));

    expect(ids.size).toBe(MODEL_PRICES.length);
    for (const model of MODEL_PRICES) {
      expect(model.id).toMatch(/^[a-z0-9-]+$/);
      expect(model.inputUsdPerMillion).toBeGreaterThan(0);
      expect(model.outputUsdPerMillion).toBeGreaterThan(0);
      expect(typeof model.inputUsdPerMillion).toBe("number");
      expect(typeof model.outputUsdPerMillion).toBe("number");
    }
  });

  it("keeps source metadata and exclusions with every model", () => {
    for (const model of MODEL_PRICES) {
      expect(model.officialModelName.length).toBeGreaterThan(0);
      expect(model.pricingUnit).toBe("USD_PER_1M_TOKENS");
      expect(model.pricingScope.length).toBeGreaterThan(0);
      expect(model.sourceUrl).toMatch(/^https:\/\//);
      expect(model.checkedAt).toBe("2026-06-10");
      expect(model.excludedVariants.length).toBeGreaterThan(0);
    }
  });
});

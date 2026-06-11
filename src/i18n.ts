import type { UsageField } from "./lib/validation";

export type Language = "en" | "zh";

interface FieldCopy {
  label: string;
  helper: string;
  error: string;
}

interface TableCopy {
  caption: string;
  provider: string;
  model: string;
  inputPrice: string;
  outputPrice: string;
  perRequest: string;
  daily: string;
  monthly: string;
  difference: string;
}

export interface AppCopy {
  languageToggleLabel: string;
  languageOptions: Record<Language, string>;
  eyebrow: string;
  title: string;
  lede: string;
  calculatorAriaLabel: string;
  usageTitle: string;
  formAriaLabel: string;
  fields: Record<UsageField, FieldCopy>;
  cheapestAriaLabel: string;
  cheapestLabel: string;
  usageSummary: (requestsPerDay: number, daysPerMonth: number) => string;
  invalidLabel: string;
  invalidMessage: string;
  table: TableCopy;
  sourcesAriaLabel: string;
  sourcesTitle: string;
  sourcesNote: (checkedAt?: string) => string;
}

export const appCopy: Record<Language, AppCopy> = {
  en: {
    languageToggleLabel: "Language",
    languageOptions: {
      en: "English",
      zh: "中文"
    },
    eyebrow: "Official text token pricing",
    title: "AI API Cost Calculator",
    lede:
      "Estimate OpenAI, Anthropic Claude, and Google Gemini API spend from a simple usage scenario. Prices are normalized to USD per million tokens.",
    calculatorAriaLabel: "Cost calculator",
    usageTitle: "Usage scenario",
    formAriaLabel: "Usage inputs",
    fields: {
      inputTokens: {
        label: "Average input tokens",
        helper: "Prompt tokens per request",
        error: "Enter an integer from 0 to 1,000,000,000."
      },
      outputTokens: {
        label: "Average output tokens",
        helper: "Completion tokens per request",
        error: "Enter an integer from 0 to 1,000,000,000."
      },
      requestsPerDay: {
        label: "Requests per day",
        helper: "Expected daily volume",
        error: "Enter an integer from 0 to 1,000,000."
      },
      daysPerMonth: {
        label: "Usage days per month",
        helper: "1 to 31 days",
        error: "Enter an integer from 1 to 31."
      }
    },
    cheapestAriaLabel: "Cheapest estimate",
    cheapestLabel: "Cheapest estimate",
    usageSummary: (requestsPerDay, daysPerMonth) =>
      `${requestsPerDay.toLocaleString(
        "en-US"
      )} requests/day across ${daysPerMonth} usage days`,
    invalidLabel: "Estimate paused",
    invalidMessage: "Fix the highlighted inputs to refresh estimates.",
    table: {
      caption: "Model cost comparison",
      provider: "Provider",
      model: "Model",
      inputPrice: "Input / 1M",
      outputPrice: "Output / 1M",
      perRequest: "Per request",
      daily: "Daily",
      monthly: "Monthly",
      difference: "Vs cheapest"
    },
    sourcesAriaLabel: "Pricing sources",
    sourcesTitle: "Sources",
    sourcesNote: (checkedAt) =>
      `Pricing checked on ${checkedAt}. This app excludes cached, batch, priority, regional, media, and enterprise pricing.`
  },
  zh: {
    languageToggleLabel: "语言",
    languageOptions: {
      en: "English",
      zh: "中文"
    },
    eyebrow: "官方文本 token 价格",
    title: "AI API 成本计算器",
    lede:
      "根据一个简单的使用场景，估算 OpenAI、Anthropic Claude 和 Google Gemini API 的费用。价格统一换算为每百万 token 的美元价格。",
    calculatorAriaLabel: "成本计算器",
    usageTitle: "使用场景",
    formAriaLabel: "用量输入",
    fields: {
      inputTokens: {
        label: "平均输入 tokens",
        helper: "每次请求的 prompt tokens",
        error: "请输入 0 到 1,000,000,000 之间的整数。"
      },
      outputTokens: {
        label: "平均输出 tokens",
        helper: "每次请求的 completion tokens",
        error: "请输入 0 到 1,000,000,000 之间的整数。"
      },
      requestsPerDay: {
        label: "每日请求量",
        helper: "预计每天调用次数",
        error: "请输入 0 到 1,000,000 之间的整数。"
      },
      daysPerMonth: {
        label: "每月使用天数",
        helper: "1 到 31 天",
        error: "请输入 1 到 31 之间的整数。"
      }
    },
    cheapestAriaLabel: "最便宜估算",
    cheapestLabel: "最便宜估算",
    usageSummary: (requestsPerDay, daysPerMonth) =>
      `每天 ${requestsPerDay.toLocaleString(
        "zh-CN"
      )} 次请求，按每月 ${daysPerMonth} 个使用日估算`,
    invalidLabel: "估算已暂停",
    invalidMessage: "修正高亮输入后会刷新估算。",
    table: {
      caption: "模型成本对比",
      provider: "供应商",
      model: "模型",
      inputPrice: "输入 / 1M",
      outputPrice: "输出 / 1M",
      perRequest: "单次请求",
      daily: "每日",
      monthly: "每月",
      difference: "与最低价差"
    },
    sourcesAriaLabel: "价格来源",
    sourcesTitle: "来源",
    sourcesNote: (checkedAt) =>
      `价格查询日期：${checkedAt}。本工具不包含缓存、批处理、priority、地区、媒体和企业定价。`
  }
};

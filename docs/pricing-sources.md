# Pricing Sources

Pricing checked on 2026-06-10.

## Scope

This app estimates standard text token usage only. It excludes cached input,
batch, flex, priority, regional/data-residency premiums, web search grounding,
tool-use fees, image, audio, video, and enterprise pricing.

All prices below are normalized to USD per 1 million tokens.

## OpenAI

Source: https://platform.openai.com/docs/pricing

Included fields: standard short-context input and output prices per 1M tokens.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| OpenAI | GPT-5.5 | openai-gpt-5-5 | 5.00 | 30.00 | Standard short-context text tokens | cached input, batch, flex, priority, regional, media, enterprise | 2026-06-10 |
| OpenAI | GPT-5.4 mini | openai-gpt-5-4-mini | 0.75 | 4.50 | Standard short-context text tokens | cached input, batch, flex, priority, regional, media, enterprise | 2026-06-10 |
| OpenAI | GPT-5.4 nano | openai-gpt-5-4-nano | 0.20 | 1.25 | Standard short-context text tokens | cached input, batch, flex, priority, regional, media, enterprise | 2026-06-10 |

## Anthropic Claude

Source: https://platform.claude.com/docs/en/about-claude/pricing

Included fields: base input tokens and output tokens per MTok.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| Anthropic | Claude Opus 4.8 | anthropic-claude-opus-4-8 | 5.00 | 25.00 | Base text tokens | prompt caching, batch, tool-use, media, enterprise | 2026-06-10 |
| Anthropic | Claude Sonnet 4.6 | anthropic-claude-sonnet-4-6 | 3.00 | 15.00 | Base text tokens | prompt caching, batch, tool-use, media, enterprise | 2026-06-10 |
| Anthropic | Claude Haiku 4.5 | anthropic-claude-haiku-4-5 | 1.00 | 5.00 | Base text tokens | prompt caching, batch, tool-use, media, enterprise | 2026-06-10 |

## Google Gemini

Source: https://ai.google.dev/gemini-api/docs/pricing

Included fields: standard text input and output prices per 1M tokens.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| Google Gemini | Gemini 2.5 Pro | google-gemini-2-5-pro | 1.25 | 10.00 | Text prompts at or below 200k tokens | cached input, long-context tier over 200k tokens, grounding, media, enterprise | 2026-06-10 |
| Google Gemini | Gemini 2.5 Flash | google-gemini-2-5-flash | 0.30 | 2.50 | Text/image/video prompts and text output | cached input, grounding, media output, enterprise | 2026-06-10 |
| Google Gemini | Gemini 2.5 Flash-Lite | google-gemini-2-5-flash-lite | 0.10 | 0.40 | Text/image/video prompts and text output | cached input, grounding, media output, enterprise | 2026-06-10 |


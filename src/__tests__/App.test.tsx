import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "../App";

function modelRows() {
  return screen.getAllByTestId("model-row");
}

describe("App", () => {
  it("renders the default usage comparison table", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "AI API Cost Calculator" })
    ).toBeInTheDocument();
    expect(screen.getByText("Cheapest estimate")).toBeInTheDocument();
    expect(modelRows()).toHaveLength(9);
    expect(screen.getAllByText("Gemini 2.5 Flash-Lite").length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText("$0.90").length).toBeGreaterThan(0);
  });

  it("updates monthly estimates when usage inputs change", async () => {
    const user = userEvent.setup();
    render(<App />);

    const requestsInput = screen.getByLabelText("Requests per day");
    await user.clear(requestsInput);
    await user.type(requestsInput, "200");

    expect(screen.getAllByText("$1.80").length).toBeGreaterThan(0);
    expect(screen.getByText(/200 requests\/day/)).toBeInTheDocument();
  });

  it("switches visible copy to Chinese without resetting estimates", async () => {
    const user = userEvent.setup();
    render(<App />);

    const requestsInput = screen.getByLabelText("Requests per day");
    await user.clear(requestsInput);
    await user.type(requestsInput, "200");
    await user.click(screen.getByRole("button", { name: "中文" }));

    expect(
      screen.getByRole("heading", { name: "AI API 成本计算器" })
    ).toBeInTheDocument();
    expect(screen.getByText("最便宜估算")).toBeInTheDocument();
    expect(screen.getByLabelText("每日请求量")).toHaveValue("200");
    expect(screen.getAllByText("$1.80").length).toBeGreaterThan(0);
    expect(screen.getByText(/每天 200 次请求/)).toBeInTheDocument();
  });

  it("shows inline validation errors for invalid input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const daysInput = screen.getByLabelText("Usage days per month");
    await user.clear(daysInput);
    await user.type(daysInput, "32");

    expect(screen.getByText("Enter an integer from 1 to 31.")).toBeInTheDocument();
    expect(screen.getByText("Fix the highlighted inputs to refresh estimates.")).toBeInTheDocument();
  });

  it("sorts model rows from cheapest to most expensive by monthly cost", () => {
    render(<App />);

    const rowNames = modelRows().map((row) =>
      within(row).getByTestId("model-name").textContent
    );

    expect(rowNames).toEqual([
      "Gemini 2.5 Flash-Lite",
      "GPT-5.4 nano",
      "Gemini 2.5 Flash",
      "GPT-5.4 mini",
      "Claude Haiku 4.5",
      "Gemini 2.5 Pro",
      "Claude Sonnet 4.6",
      "Claude Opus 4.8",
      "GPT-5.5"
    ]);
  });

  it("renders monthly difference from the cheapest model", () => {
    render(<App />);

    const rows = modelRows();

    expect(
      screen.getByRole("columnheader", { name: "Vs cheapest" })
    ).toBeInTheDocument();
    expect(within(rows[0]).getByTestId("monthly-difference")).toHaveTextContent(
      "$0.00"
    );
    expect(within(rows[1]).getByTestId("monthly-difference")).toHaveTextContent(
      "+$1.58"
    );
  });

  it("renders official pricing source links", () => {
    render(<App />);

    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      expect.arrayContaining([
        "https://platform.openai.com/docs/pricing",
        "https://platform.claude.com/docs/en/about-claude/pricing",
        "https://ai.google.dev/gemini-api/docs/pricing"
      ])
    );
  });
});

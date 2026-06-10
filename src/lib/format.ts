const normalUsdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const subCentUsdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6
});

export function formatUsd(value: number): string {
  const abs = Math.abs(value);
  const formatter =
    abs > 0 && abs < 0.01 ? subCentUsdFormatter : normalUsdFormatter;

  return formatter.format(value);
}

export function formatMonthlyDifference(
  monthlyUsd: number,
  cheapestMonthlyUsd: number
): string {
  const difference = Math.max(0, monthlyUsd - cheapestMonthlyUsd);
  const formatted = formatUsd(difference);

  return difference === 0 ? formatted : `+${formatted}`;
}

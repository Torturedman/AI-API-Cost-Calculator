export function formatUsd(value: number): string {
  const fractionDigits =
    Math.abs(value) > 0 && Math.abs(value) < 0.01
      ? { minimumFractionDigits: 2, maximumFractionDigits: 6 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...fractionDigits
  }).format(value);
}

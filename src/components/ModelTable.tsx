import type { ModelCostEstimate } from "../lib/cost";
import { formatUsd } from "../lib/format";

interface ModelTableProps {
  results: ModelCostEstimate[];
  copy: {
    caption: string;
    provider: string;
    model: string;
    inputPrice: string;
    outputPrice: string;
    perRequest: string;
    daily: string;
    monthly: string;
    difference: string;
  };
}

export function ModelTable({ results, copy }: ModelTableProps) {
  const cheapestMonthlyUsd = results[0]?.monthlyUsd ?? 0;

  function formatMonthlyDifference(monthlyUsd: number) {
    const difference = Math.max(0, monthlyUsd - cheapestMonthlyUsd);
    const formatted = formatUsd(difference);

    return difference === 0 ? formatted : `+${formatted}`;
  }

  return (
    <div className="table-wrap">
      <table>
        <caption>{copy.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{copy.provider}</th>
            <th scope="col">{copy.model}</th>
            <th scope="col">{copy.inputPrice}</th>
            <th scope="col">{copy.outputPrice}</th>
            <th scope="col">{copy.perRequest}</th>
            <th scope="col">{copy.daily}</th>
            <th scope="col">{copy.monthly}</th>
            <th scope="col">{copy.difference}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr data-testid="model-row" key={result.model.id}>
              <td>{result.model.provider}</td>
              <td data-testid="model-name">{result.model.displayName}</td>
              <td>{formatUsd(result.model.inputUsdPerMillion)}</td>
              <td>{formatUsd(result.model.outputUsdPerMillion)}</td>
              <td>{formatUsd(result.perRequestUsd)}</td>
              <td>{formatUsd(result.dailyUsd)}</td>
              <td>{formatUsd(result.monthlyUsd)}</td>
              <td data-testid="monthly-difference">
                {formatMonthlyDifference(result.monthlyUsd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { ModelCostEstimate } from "../lib/cost";
import { formatUsd } from "../lib/format";

interface ModelTableProps {
  results: ModelCostEstimate[];
}

export function ModelTable({ results }: ModelTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <caption>Model cost comparison</caption>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">Model</th>
            <th scope="col">Input / 1M</th>
            <th scope="col">Output / 1M</th>
            <th scope="col">Per request</th>
            <th scope="col">Daily</th>
            <th scope="col">Monthly</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

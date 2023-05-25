import { VerticalBar } from "../../../../vertical_bar";
import { BillingProgress } from "../../../../../models/billing.progress.model";

export function BarChartItem({ data }: { data: BillingProgress }) {
  return (
    <VerticalBar
      title={data ? data.periodo : ""}
      step={data ? data.total : 0}
      steps={10}
      selected={data ? data.selected : false}
    />
  );
}

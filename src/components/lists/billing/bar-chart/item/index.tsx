import { VerticalBar } from "../../../../vertical_bar";
import { BillingProgress } from "../../../../../models/billing.progress.model";

export function BarChartItem({ data }: { data: BillingProgress }) {
    return (
        <VerticalBar
            title={data.periodo}
            step={data.total}
            steps={10}
            selected={data.selected} />
    )
}
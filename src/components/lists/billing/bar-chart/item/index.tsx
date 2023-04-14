import { VerticalBar } from "../../../../vertical_bar";

export function BarChartItem({ data }: { data: any }) {
    return (
        <VerticalBar
            title={data.date}
            step={data.bill}
            steps={1000}
            selected={data.selected} />
    )
}
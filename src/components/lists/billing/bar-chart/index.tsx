import { FlatList, ListRenderItem } from "react-native";
import { BarChartItem } from "./item";
import { BillingProgress } from "../../../../models/billing.progress.model";

interface Properties {
    data?: BillingProgress[]
}

export function BarChart(properties: Properties) {
    const renderItem: ListRenderItem<BillingProgress> = ({ item }) => (
        <BarChartItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} horizontal={true} />
}
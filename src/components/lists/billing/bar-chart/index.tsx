import { FlatList, ListRenderItem } from "react-native";
import { BarChartItem } from "./item";

interface Properties {
    data?: any[]
}

export function BarChart(properties: Properties) {
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <BarChartItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} horizontal={true} />
}
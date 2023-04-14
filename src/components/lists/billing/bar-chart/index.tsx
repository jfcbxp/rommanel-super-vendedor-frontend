import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { BarChartItem } from "./item";

interface Properties {
    data?: any[]
}

export function BarChart(properties: Properties) {
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <BarChartItem data={item} />
    )
    return (
        <ScrollView
            horizontal={true}
            style={{ flex: 1, width: "100%", paddingVertical: "2.5%" }}>
            <FlatList data={properties.data} renderItem={renderItem} horizontal={true} />
        </ScrollView>
    )
}
import { FlatList, ListRenderItem } from "react-native";
import { BillingItem } from "./item";

interface Properties {
    data?: any[]
}

export function BillingList(properties: Properties) {
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <BillingItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} />
}
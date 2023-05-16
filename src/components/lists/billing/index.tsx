import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { BillingItem } from "./item";

interface Properties {
    data?: any[]
}

export function BillingList(properties: Properties) {
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <BillingItem data={item} />
    )
    return (
        <ScrollView style={{flex: 1}}>
            <FlatList data={properties.data} renderItem={renderItem} />
        </ScrollView>
    )
}
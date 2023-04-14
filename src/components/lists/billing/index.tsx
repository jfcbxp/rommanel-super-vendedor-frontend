import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { BillingItem } from "./item";
import { Costumer } from "../../../models/costumer.model";

interface Properties {
    data?: Costumer[]
}

export function BillingList(properties: Properties) {
    const renderItem: ListRenderItem<Costumer> = ({ item }) => (
        <BillingItem data={item} />
    )
    return (
        <ScrollView style={{flex: 1}}>
            <FlatList data={properties.data} renderItem={renderItem} />
        </ScrollView>
    )
}
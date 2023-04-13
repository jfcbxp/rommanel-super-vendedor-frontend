import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { SchedulingItem } from "./item";
import { Costumer } from "../../../models/costumer.model";

interface Properties {
    data?: Costumer[]
}

export function SchedulingList(properties: Properties) {
    const renderItem: ListRenderItem<Costumer> = ({ item }) => (
        <SchedulingItem data={item} />
    )
    return (
        <ScrollView style={{flex: 1}}>
            <FlatList data={properties.data} renderItem={renderItem} />
        </ScrollView>
    )
}
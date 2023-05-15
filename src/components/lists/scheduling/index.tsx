import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { SchedulingItem } from "./item";
import { Schedule } from "../../../models/schedule.model";

interface Properties {
    data?: Schedule[]
}

export function SchedulingList(properties: Properties) {
    const renderItem: ListRenderItem<Schedule> = ({ item }) => (
        <SchedulingItem data={item} />
    )
    return (
        <ScrollView style={{ flex: 1 }}>
            <FlatList data={properties.data} renderItem={renderItem} />
        </ScrollView>
    )
}
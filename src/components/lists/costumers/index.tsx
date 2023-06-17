import { FlatList, ListRenderItem } from "react-native";
import { Costumer } from "../../../models/costumer.model";
import { CostumerItem } from "./item";

interface Properties {
    data?: Costumer[]
}

export function CostumerList(properties: Properties) {
    const renderItem: ListRenderItem<Costumer> = ({ item }) => (
        <CostumerItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} />
}
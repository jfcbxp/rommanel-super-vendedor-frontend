import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { WalletItem } from "./item";
import { Costumer } from "../../../models/costumer.model";

interface Properties {
    data?: Costumer[]
}

export function WalletList(properties: Properties) {
    const renderItem: ListRenderItem<Costumer> = ({ item }) => (
        <WalletItem data={item} />
    )
    return (
        <ScrollView style={{flex: 1}}>
            <FlatList data={properties.data} renderItem={renderItem} />
        </ScrollView>
    )
}
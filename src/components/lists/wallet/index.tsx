import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { WalletItem } from "./item";

interface Properties {
    data?: any[]
}

export function WalletList(properties: Properties) {
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <WalletItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} />
}
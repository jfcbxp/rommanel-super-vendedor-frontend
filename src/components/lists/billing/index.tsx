import { FlatList, ListRenderItem } from "react-native";
import { BillingItem } from "./item";
import { BillingModel } from "../../../models/billing.model";

interface Properties {
    data?: BillingModel[]
}

export function BillingList(properties: Properties) {
    const renderItem: ListRenderItem<BillingModel> = ({ item }) => (
        <BillingItem data={item} />
    )
    return <FlatList data={properties.data} renderItem={renderItem} />
}
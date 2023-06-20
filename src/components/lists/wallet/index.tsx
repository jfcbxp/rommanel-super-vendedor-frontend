import { FlatList, ListRenderItem } from 'react-native';
import { WalletItem } from './item';
import { Wallet } from '../../../models/wallet.model';

interface Properties {
    data?: Wallet[];
}

export function WalletList(properties: Properties) {
    const renderItem: ListRenderItem<Wallet> = ({ item }) => <WalletItem data={item} />;
    return <FlatList data={properties.data} renderItem={renderItem} />;
}

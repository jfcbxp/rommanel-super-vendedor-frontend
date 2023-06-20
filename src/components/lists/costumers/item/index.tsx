import { Text, TouchableOpacity } from 'react-native';
import { Costumer } from '../../../../models/costumer.model';
import { ItemsStyles as styles } from '../../items/styles';
import { Divider } from '../../../divider';
import { Context } from '../../../../context';
import { useContext } from 'react';

export function CostumerItem({ data }: { data: Costumer }) {
    const context = useContext(Context);

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    context.handleChangeCostumer(data);
                }}
            >
                <Text style={[styles.code, { fontSize: 14 }]}>{data.codigo}</Text>
                <Text style={[styles.costumer, { fontSize: 14 }]}>{data.nome}</Text>
            </TouchableOpacity>
            <Divider />
        </>
    );
}

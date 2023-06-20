import { View, Text } from 'react-native';
import { Divider } from '../../divider';
import { WalletHeaderStyles as styles } from './styles';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../../../types/navigation.params';

interface Properties {
    total: number;
    total_: number;
    actives: number;
    actives_: number;
    preInactives: number;
    preInactives_: number;
    inactives: number;
    inactives_: number;
}

export function WalletHeader(properties: Properties) {
    const navigation = useNavigation<NavigationParams>();

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="chevron-left"
                    color="white"
                    size={48}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                />
                <Text style={styles.title}>Carteira de Clientes</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.total}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.total_}</Text>
                        <Text style={styles.text}> carteira inativos</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Ativos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.actives}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.actives_}</Text>
                        <Text style={styles.text}> carteira inativos</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.field}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Pre Inativos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.preInactives}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.preInactives_}</Text>
                        <Text style={styles.text}> carteira inativos</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Inativos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.inactives}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.inactives_}</Text>
                        <Text style={styles.text}> carteira inativos</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

interface Properties2 {
    status: number;
}

function WalletHeader_(properties: Properties2) {
    return properties.status >= 0 ? (
        <Icon name="arrow-upward" color="#60D29D" size={18} />
    ) : (
        <Icon name="arrow-downward" color="#FF5454" size={18} />
    );
}

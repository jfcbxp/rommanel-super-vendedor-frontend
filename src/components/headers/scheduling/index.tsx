import { View, Text } from 'react-native';
import { Divider } from '../../divider';
import { SchedulingHeaderStyles as styles } from './styles';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../../../types/navigation.params';

interface Properties {
    dailyTotal: number;
    monthlyTotal: number;
    dailyPredicted: number;
    monthlyPredicted: number;
    dailyAbsences: number;
    monthlyAbsences: number;
    dailyArrivals: number;
    monthlyArrivals: number;
}

export function SchedulingHeader(properties: Properties) {
    if (!properties) {
        properties = {
            dailyTotal: 0,
            monthlyTotal: 0,
            dailyPredicted: 0,
            monthlyPredicted: 0,
            dailyAbsences: 0,
            monthlyAbsences: 0,
            dailyArrivals: 0,
            monthlyArrivals: 0,
        };
    }

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
                <Text style={styles.title}>Agendamentos</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.dailyTotal}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <SchedulingHeader_ status={properties.monthlyTotal} />
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.monthlyTotal}</Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Previstos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.dailyPredicted}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <SchedulingHeader_ status={properties.monthlyPredicted} />
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.monthlyPredicted}</Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.field}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Faltas</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.dailyAbsences}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <SchedulingHeader_ status={properties.monthlyAbsences} />
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.monthlyAbsences}</Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Chegaram</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.dailyArrivals}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <SchedulingHeader_ status={properties.monthlyArrivals} />
                        <Text style={[styles.text, { color: '#FE38F2' }]}>{properties.monthlyArrivals}</Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

interface PropertiesStatus {
    status: number;
}

function SchedulingHeader_(properties: PropertiesStatus) {
    return properties.status >= 0 ? (
        <Icon name="arrow-upward" color="#60D29D" size={18} />
    ) : (
        <Icon name="arrow-downward" color="#FF5454" size={18} />
    );
}

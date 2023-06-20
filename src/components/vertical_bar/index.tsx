import { Text, TouchableOpacity, View } from 'react-native';
import { VerticalBarStyles as styles } from './styles';
import { useContext } from 'react';
import { Context } from '../../context';

interface Properties {
    title: string;
    step: number;
    steps: number;
    selected: boolean;
}

export function VerticalBar(properties: Properties) {
    const context = useContext(Context);
    const progress = (properties.step * 100) / properties.steps;
    let day = properties.title.slice(0, 2);
    if (day.startsWith('0')) {
        day = day.substring(1);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    context.handleChangeDate(properties.title);
                }}
                style={[styles.bar, { height: progress > 90 ? 90 + '%' : progress + '%' }]}
                disabled={properties.selected}
            >
                {properties.selected ? <View style={styles.selected} /> : undefined}
            </TouchableOpacity>
            <Text style={styles.title}>{day}</Text>
        </View>
    );
}

import { View, Text, ScrollView, GestureResponderEvent } from 'react-native';
import { Divider } from '../divider';
import { ContainerStyles as styles } from './styles';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface Properties {
    title: string;
    children?: React.ReactNode;
    disabled?: boolean;
    onReload?: (event: GestureResponderEvent) => void;
}

export function Container(properties: Properties) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{properties.title}</Text>
                {properties.onReload && !properties.disabled ? (
                    <Icon
                        name="reload"
                        color="#73186D"
                        size={32}
                        disabled={properties.disabled}
                        onPress={properties.onReload}
                    />
                ) : undefined}
            </View>
            <Divider />
            <ScrollView style={{ flex: 1 }}>{properties.children}</ScrollView>
        </View>
    );
}

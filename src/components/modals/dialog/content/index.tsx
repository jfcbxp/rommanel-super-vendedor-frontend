import { GestureResponderEvent, Modal, View, Text } from 'react-native';
import { DialogStyles as styles } from '../styles';
import { Button } from '../../../buttons/button';

interface Properties {
    visible: boolean | undefined;
    dismiss: ((event: GestureResponderEvent) => void) | undefined;
    title: string;
    children: React.ReactNode;
}

export function ContentDialog(properties: Properties) {
    return (
        <Modal {...properties} visible={properties.visible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.title}>{properties.title}</Text>
                    {properties.children}
                    <Button onPress={properties.dismiss} title="CANCELAR" />
                </View>
            </View>
        </Modal>
    );
}

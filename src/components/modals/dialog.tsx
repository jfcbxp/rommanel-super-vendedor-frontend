import { GestureResponderEvent, Modal, View, Text } from "react-native";
import { DialogStyles as styles } from "./styles";
import { Button } from "../buttons/button";

interface Properties {
    visible: boolean | undefined;
    dismiss: ((event: GestureResponderEvent) => void) | undefined;
    title: string;
    content: string;
}

export function Dialog(properties: Properties) {
    return (
        <Modal {...properties}
            visible={properties.visible}
            transparent={true}
            animationType="fade">
            <View style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.title}>{properties.title}</Text>
                    <Text style={styles.content}>{properties.content}</Text>
                    <Button onPress={properties.dismiss} title="CONTINUAR" />
                </View>
            </View>
        </Modal>
    );
}
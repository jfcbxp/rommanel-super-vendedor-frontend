import { View, Text, ScrollView } from "react-native";
import { Divider } from "../divider";
import { ContainerStyles as styles } from "./styles";

interface Properties {
    title: string;
    children?: React.ReactNode;
}

export function Container(properties: Properties) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{properties.title}</Text>
            <Divider />
            <ScrollView style={{ flex: 1 }}>
                {properties.children}
            </ScrollView>

        </View>
    );
}
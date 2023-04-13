import { Pressable, PressableProps, Text, View } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { NavigationButtonStyles as styles } from "./styles";

interface Properties extends PressableProps {
    icon: keyof typeof Icon.glyphMap;
    title: string;
}

export function NavigationButton(properties: Properties) {
    return (
        <Pressable {...properties} style={styles.container}>
            <View style={styles.area}>
                <Icon
                    name={properties.icon}
                    size={42}
                    color="#73186D"
                    style={{ alignSelf: "center" }}
                />
                <Text style={styles.text}>{properties.title}</Text>
            </View>
        </Pressable>
    );
}
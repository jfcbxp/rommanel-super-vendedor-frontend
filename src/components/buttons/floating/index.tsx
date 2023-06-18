import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FloatingButtonStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";

export function FloatingButton(properties: TouchableOpacityProps) {
    return (
        <TouchableOpacity {...properties} style={styles.button}>
            <Icon
                name="add"
                size={48}
                color="#73186D" />
        </TouchableOpacity>
    )
}
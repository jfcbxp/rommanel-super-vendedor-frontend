import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "../styles";

export function UsernameInput(properties: TextInputProps) {
    return (
        <TextInput
            {...properties}
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder="Usuário"
            placeholderTextColor="#73186D"
            style={styles.input} />
    )
}
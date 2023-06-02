import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "../styles";

export function CodeInput(properties: TextInputProps) {
    return (
        <TextInput
            {...properties}
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder="Código do vendedor"
            placeholderTextColor="#73186D"
            maxLength={6}
            keyboardType="number-pad"
            style={styles.input} />
    )
}
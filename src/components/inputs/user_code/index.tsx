import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "../styles";

export function UserCodeInput(properties: TextInputProps) {
    return (
        <TextInput
            {...properties}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder="Matrícula"
            placeholderTextColor="#73186D"
            maxLength={6}
            style={styles.input} />
    )
}
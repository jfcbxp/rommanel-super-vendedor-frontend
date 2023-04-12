import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "../styles";

export function EmailInput(properties: TextInputProps) {
    return (
        <TextInput
            {...properties}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder="E-mail"
            placeholderTextColor="#73186D"
            style={styles.input} />
    )
}
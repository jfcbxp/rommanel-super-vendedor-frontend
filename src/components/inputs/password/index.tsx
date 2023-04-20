import { TextInput, TextInputProps } from "react-native";
import { InputStyles as styles } from "../styles";

interface Properties extends TextInputProps {
    placeholder?: string;
}

export function PasswordInput(properties: Properties) {
    return (
        <TextInput
            {...properties}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            placeholder={properties.placeholder ? properties.placeholder : "Senha"}
            placeholderTextColor="#73186D"
            style={styles.input} />
    );
}

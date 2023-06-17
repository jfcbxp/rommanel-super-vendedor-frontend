import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { InputStyles as styles } from "../styles";

export function MaskedInput(properties: TextInputMaskProps) {
    return (
        <TextInputMask
            {...properties}
            includeRawValueInChangeText={true}
            placeholderTextColor="#73186D"
            style={[styles.input, { width: "47.5%" }]}
        />
    );
}

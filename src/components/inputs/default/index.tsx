import { TextInput, TextInputProps } from 'react-native';
import { InputStyles as styles } from '../styles';

export function Input(properties: TextInputProps) {
    return <TextInput {...properties} maxFontSizeMultiplier={14} placeholderTextColor="#73186D" style={styles.input} />;
}

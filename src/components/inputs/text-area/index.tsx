import { TextInput, TextInputProps } from 'react-native';
import { InputStyles as styles } from '../styles';

export function TextArea(properties: TextInputProps) {
    return (
        <TextInput
            {...properties}
            autoCapitalize="none"
            maxFontSizeMultiplier={14}
            placeholder={properties.placeholder ? properties.placeholder : 'DIGITE AQUI AS OBSERVAÇÕES...'}
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
            style={[styles.input, { height: 128 }]}
        />
    );
}

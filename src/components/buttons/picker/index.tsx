import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import { PickerStyles as styles } from './styles';

export function Picker(properties: DropDownPickerProps<any>) {
    return (
        <DropDownPicker
            {...properties}
            textStyle={styles.font}
            labelStyle={styles.font}
            maxHeight={320}
            style={styles.picker}
        />
    );
}

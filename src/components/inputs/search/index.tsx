import { GestureResponderEvent, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { InputStyles as styles } from '../styles';
import { SearchInputStyles as styles_ } from './styles';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

interface Properties extends TextInputProps {
    onPress: (event: GestureResponderEvent) => void;
}

export function SearchInput(properties: Properties) {
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        setOpacity(properties.value ? 1 : 0.5);
    }, [properties.value]);

    return (
        <View>
            <TextInput
                {...properties}
                maxFontSizeMultiplier={14}
                placeholder="Pesquisar cliente"
                placeholderTextColor="#73186D"
                style={styles.input}
            />
            <TouchableOpacity
                disabled={properties.value ? false : true}
                onPress={properties.onPress}
                style={[styles_.button, { opacity: opacity }]}
            >
                <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

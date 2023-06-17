import { GestureResponderEvent, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { InputStyles as styles } from "../styles";
import { SearchInputStyles as styles_ } from "./styles";
import {MaterialIcons as Icon} from "@expo/vector-icons";

interface Properties extends TextInputProps {
    onPress: (event: GestureResponderEvent) => void
}

export function SearchInput(properties: Properties) {
    return (
        <View>
            <TextInput
                {...properties}
                maxFontSizeMultiplier={14}
                placeholder="Pesquisar cliente"
                placeholderTextColor="#73186D"
                style={styles.input} />
            <TouchableOpacity onPress={properties.onPress} style={styles_.button}>
                <Icon 
                    name="search"
                    size={24}
                    color="white"/>
            </TouchableOpacity>
        </View>
    )
}
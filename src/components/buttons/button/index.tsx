import { useEffect, useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ButtonStyles as styles } from "./styles";

interface Properties extends TouchableOpacityProps {
    title: string;
    disabled?: boolean;
} 

export function Button(properties: Properties) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setOpacity(properties.disabled ? 0.5 : 1);
    }, [properties.disabled]);

    return (
        <TouchableOpacity
            {...properties}
            disabled={properties.disabled}
            style={[styles.button, { opacity: opacity }]}>
            <Text style={styles.text}>{properties.title}</Text>
        </TouchableOpacity>
    );
}
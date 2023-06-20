import { Pressable, PressableProps, Text } from 'react-native';
import { CommandLinkStyles as styles } from './styles';

interface Properties extends PressableProps {
    title: string;
}

export function CommandLink(properties: Properties) {
    return (
        <Pressable {...properties}>
            <Text style={styles.text}>{properties.title}</Text>
        </Pressable>
    );
}

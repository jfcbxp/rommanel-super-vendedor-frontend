import { StyleSheet } from 'react-native';

export const SchedulingHeaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 550,
        width: '100%',
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5%',
    },
    field: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: 'white',
        marginLeft: '2.5%',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: 'white',
    },
});

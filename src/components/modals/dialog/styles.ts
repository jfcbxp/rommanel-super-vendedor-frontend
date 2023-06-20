import { StyleSheet } from 'react-native';

export const DialogStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    field: {
        marginHorizontal: '5%',
        backgroundColor: '#F0F2F7',
        borderRadius: 18,
        padding: '5%',
    },
    title: {
        marginVertical: 8,
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        marginVertical: 8,
        paddingHorizontal: '5%',
        fontSize: 16,
        textAlign: 'justify',
    },
});

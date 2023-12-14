import { StyleSheet } from 'react-native';

export const BillingHeaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 550,
        width: '100%',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5%',
    },
    field: {
        flex: 3,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: 'white',
        marginLeft: '2.5%',
    },
});

import { Dimensions, StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get('window').height,
        backgroundColor: '#F0F2F7',
    },
    body: {
        flex: 12,
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigator: {
        flex: 1.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '2%',
        maxWidth: 550,
        width: '100%',
    },
    bottom: {
        flex: 7.25,
        paddingTop: '0.5%',
        maxWidth: 550,
        width: '100%',
    },
    title: {
        fontSize: 13,
        fontFamily: 'Inter_700Bold',
        color: '#73186D',
        alignSelf: 'flex-end',
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
        color: '#BEC0C5',
    },
});

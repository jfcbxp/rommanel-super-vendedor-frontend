import { Dimensions, StyleSheet } from 'react-native';

export const BillingStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get('window').height,
        backgroundColor: '#F0F2F7',
    },
    top: {
        flex: 0.5,
        backgroundColor: '#73186D',
        paddingHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 1.3,
        paddingHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overview: {
        flex: 0.4,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '1.5%',
        marginHorizontal: '2.5%',
        marginBottom: '1.25%',
        borderRadius: 8,
        maxWidth: 550,
        width: '100%',
    },
    overview_box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    overview_inner_box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '2.5%',
    },
    list: {
        flex: 1.6,
        margin: '1.5%',
        maxWidth: 550,
        width: '100%',
    },
    overview_1: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: 'silver',
        marginBottom: '2.5%',
    },
    overview_2: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: '#73186D',
    },
    overview_3: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#60D29D',
    },
});

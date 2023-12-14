import { Dimensions, StyleSheet } from 'react-native';

export const SchedulingStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get('window').height,
        backgroundColor: '#F0F2F7',
    },
    top: {
        flex: 0.8,
        backgroundColor: '#73186D',
        paddingHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 1.2,
        paddingHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overview: {
        flex: 0.4,
        minHeight: 136,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '1.5%',
        marginHorizontal: '2.5%',
        marginBottom: '1.25%',
        borderRadius: 8,
    },
    list: {
        flex: 1.6,
        margin: '2.5%',
        maxWidth: 550,
        width: '100%',
    },
    overview_1: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: 'silver',
        marginBottom: '5%',
    },
    overview_2: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        color: '#FE38F2',
        marginBottom: '2.5%',
    },
    overview_3: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: '#73186D',
    },
});

import { StyleSheet } from "react-native";

export const WalletItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: "2.5%",
        padding: "2.5%",
    },
    top: {
        flexDirection: "row",
        marginBottom: "2.5%",
        justifyContent: "space-between",
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    code: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        color: "#73186D"
    },
    costumer: {
        fontSize: 10,
        fontFamily: "Inter_500Medium",
        color: "silver"
    },
    box: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginHorizontal: 4,
        borderRadius: 4,
    },
    icons: {
        flexDirection: "row",
        position: "relative",
        right: 0,
        gap: 32,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#73186D",
        padding: 8,
        borderRadius: 4,
        zIndex: 99,
    },
})
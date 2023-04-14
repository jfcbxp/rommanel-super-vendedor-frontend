import { StyleSheet } from "react-native";

export const WalletStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F7",
    },
    top: {
        flex: 0.8,
        backgroundColor: "#73186D",
        paddingHorizontal: "2.5%",
    },
    bottom: {
        flex: 1.2,
        paddingHorizontal: "2.5%",
    },
    overview: {
        flex: 0.4,
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "2.5%",
        marginHorizontal: "2.5%",
        marginBottom: "1.25%",
        borderRadius: 8,
    },
    list: {
        flex: 1.6,
        margin: "2.5%",
        zIndex: -1,
    },
    overviewText: {
        fontSize: 24,
        fontFamily: "Inter_700Bold",
        color: "#73186D",
    }
})
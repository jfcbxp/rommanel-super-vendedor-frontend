import { StyleSheet } from "react-native";

export const NavigationButtonStyles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#73186D",
        backgroundColor: "white",
        alignItems: "center",
    },
    area: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingVertical: 14,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#73186D",
        textAlign: "center",
        textAlignVertical: "center",
    },
})
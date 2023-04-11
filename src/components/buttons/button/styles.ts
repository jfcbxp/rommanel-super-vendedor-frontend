import { StyleSheet } from "react-native";

export const ButtonStyles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: "#601C5C",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 90,
        elevation: 3,
        marginTop: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
import { Dimensions, StyleSheet } from "react-native";

export const SignInStyles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get("window").height,
        backgroundColor: "#F0F2F7",
        justifyContent: "center",
        paddingHorizontal: "10%"
    },
    title: {
        fontSize: 28,
        fontFamily: "Inter_700Bold",
        width: 300,
        color: "#73186D",
    },
    text: {
        width: "100%",
        height: 40,
        fontSize: 16,
        fontFamily: "Inter_700Bold",

        letterSpacing: 0.25,
        color: "#73186D",
        textAlign: "center",
        marginBottom: 40,
    },
})
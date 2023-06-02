import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F7",
    },
    body: {
        flex: 9,
        paddingHorizontal: "5%",
    },
    navigator: {
        flex: 1.75,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "5%",
    },
    bottom: {
        flex: 7.25,
        paddingTop: "2.5%",
    },
    title: {
        fontSize: 13,
        fontFamily: "Inter_700Bold",
        color: "#73186D",
        alignSelf: "flex-end",
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        textAlign: "center",
        color: "#BEC0C5",
    },
})
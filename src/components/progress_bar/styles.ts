import { StyleSheet } from "react-native";

export const ProgressBarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: "2.5%",
    },
    titles: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",

        color: "#73186D",
    },
    subTitle: {
        fontSize: 8,
        fontFamily: "Inter_500Medium",
        color: "#BEC0C5",
    },
    progressBar: {
        flex: 1,
        paddingVertical: "2.5%",
    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bar: {
        flex: 7,
    }
})
import { StyleSheet } from "react-native";

export const VerticalBarStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    bar: {
        width: 16,
        borderRadius: 8,
        backgroundColor: "#B024A7",
        marginHorizontal: 8,
    },
    selected: {
        width: 16,
        height: "100%",
        borderRadius: 8,
        backgroundColor: "#FE38F2"
    },
    title: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        color: "white",
    }
})
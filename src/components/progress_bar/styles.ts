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
        fontWeight: "bold",
        color: "#73186D",
    },
    subTitle: {
        fontWeight: "bold",
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
import { StyleSheet } from "react-native";

export const SchedulingItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: "2.5%",
        padding: "2.5%"
    },
    top: {
        flexDirection: "row"
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    code: {
        fontSize: 16,
        color: "#73186D"
    },
    costumer: {
        fontSize: 13,
        color: "silver"
    }
})
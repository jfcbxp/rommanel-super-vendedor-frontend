import { StyleSheet } from "react-native";

export const BillingHeaderStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        padding: "5%",
    },
    field: {
        flex: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        marginLeft: "2.5%"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
})
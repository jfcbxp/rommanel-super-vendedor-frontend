import { StyleSheet } from "react-native";

export const SchedulingItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: "2.5%",
        padding: "2.5%",
    },
    top: {
        flexDirection: "row",
        marginBottom: "5%"
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    code: {
        fontSize: 12,
        fontFamily: "Inter_500Medium",
        color: "#73186D"
    },
    costumer: {
        fontSize: 10,
        fontFamily: "Inter_500Medium",
        color: "silver"
    },
    box: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginHorizontal: 4,
        borderRadius: 4,
    }
})
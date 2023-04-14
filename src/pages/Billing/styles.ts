import { StyleSheet } from "react-native";

export const BillingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F7",
    },
    top: {
        flex: 0.7,
        backgroundColor: "#73186D",
        paddingHorizontal: "2.5%",
    },
    bottom: {
        flex: 1.3,
        paddingHorizontal: "2.5%",
    },
    overview: {
        flex: 0.4,
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "2.5%",
        marginHorizontal: "2.5%",
        marginBottom: "1.25%",
        borderRadius: 8,
    },
    overview_box: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    overview_inner_box: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "2.5%",
    },
    list: {
        flex: 1.6,
        margin: "2.5%",
    },
    overview_1: {
        fontSize: 18,
        color: "silver",
    },
    overview_2: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#73186D",
    },
    overview_3: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#60D29D",
    }
})
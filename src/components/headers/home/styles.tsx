import { StyleSheet } from "react-native";

export const HomeHeaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#73186D",
        justifyContent: "center",
        paddingHorizontal: "5%",
    },
    portrait: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titles: {
        flex: 3,
        justifyContent: "center",
    },
    logout: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    subTitle: {
        fontWeight: "bold",
        color: "white",
    }
})
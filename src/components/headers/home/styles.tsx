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
        fontSize: 18,
        fontFamily: "Inter_700Bold",
        color: "white",
    },
    subTitle: {
        fontSize: 13,
        fontFamily: "Inter_500Medium",
        color: "white",
    }
})
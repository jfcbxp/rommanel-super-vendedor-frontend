import { useContext } from "react";
import { View, Image, Text } from "react-native";
import { HomeHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons"
import { Context } from "../../../context";

export function HomeHeader() {
    const context = useContext(Context)
    return (
        <View style={styles.container}>
            <View style={styles.portrait}>
                <Image
                    source={require("../../../assets/ROMMANEL_BUTTLERFLY.png")}
                    style={{
                        width: 56,
                        height: 56,
                        backgroundColor: "#F0F2F7",
                        borderWidth: 3,
                        borderColor: "#601C5C",
                        borderRadius: 90
                    }} />
            </View>
            <View style={styles.titles}>
                <Text style={styles.title}>{context.user?.fullName.trim()}</Text>
                <Text style={styles.subTitle}>{context.user?.role[0] == "ROLE_USER" ? "Vendedor" : undefined}</Text>
            </View>
            <View style={styles.logout}>
                <Icon
                    name="logout"
                    size={32}
                    color="white"
                    style={{ marginLeft: "auto" }}
                    onPress={() => context.signOut()} />
            </View>
        </View>
    )
}
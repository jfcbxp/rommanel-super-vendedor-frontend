import { View, Text } from "react-native";
import { BillingHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { BarChart } from "../../lists/billing/bar-chart";

interface Properties {
    data?: any[]
}

export function BillingHeader(properties: Properties) {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="bar-chart"
                    color="white"
                    size={36}
                    style={{
                        padding: 8,
                        backgroundColor: "#FE38F2",
                        borderRadius: 90,
                    }} />
                <Text style={styles.title}>Faturamento</Text>
            </View>
            <BarChart data={properties.data} />
        </View>
    )
}
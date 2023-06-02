import { View, Text } from "react-native";
import { BillingHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { BarChart } from "../../lists/billing/bar-chart";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../../types/navigation.params";
import { BillingProgress } from "../../../models/billing.progress.model";

interface Properties {
    data?: BillingProgress[]
}

export function BillingHeader(properties: Properties) {
    const navigation = useNavigation<NavigationParams>()

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="chevron-left"
                    color="white"
                    size={48}
                    onPress={() => { navigation.navigate("Home") }} />
                <Text style={styles.title}>Faturamento</Text>
            </View>
            <BarChart data={properties.data} />
        </View>
    )
}